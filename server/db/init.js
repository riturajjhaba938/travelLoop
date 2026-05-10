const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Parse connection string to get base connection for 'postgres' db
const dbUrl = process.env.DATABASE_URL;
const baseDbUrl = dbUrl.substring(0, dbUrl.lastIndexOf('/')) + '/postgres';
const targetDbName = dbUrl.substring(dbUrl.lastIndexOf('/') + 1);

const ensureDatabaseExists = async () => {
  console.log(`Checking if database "${targetDbName}" exists...`);
  const client = new Client({ connectionString: baseDbUrl });
  
  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [targetDbName]);
    
    if (res.rowCount === 0) {
      console.log(`Database "${targetDbName}" does not exist. Creating it...`);
      await client.query(`CREATE DATABASE ${targetDbName}`);
      console.log(`Database "${targetDbName}" created successfully.`);
    } else {
      console.log(`Database "${targetDbName}" already exists.`);
    }
  } catch (err) {
    console.error('Error ensuring database exists:', err.message);
    throw err;
  } finally {
    await client.end();
  }
};

const runSqlFile = async (pool, filePath) => {
  const sql = fs.readFileSync(filePath, 'utf8');
  try {
    // pg-pool doesn't support multiple statements in one query by default if using parameters,
    // but for schema/seed files it usually works if they are plain SQL.
    await pool.query(sql);
    console.log(`Successfully executed: ${path.basename(filePath)}`);
  } catch (err) {
    console.error(`Error executing ${path.basename(filePath)}:`, err.message);
    throw err;
  }
};

const initializeDb = async () => {
  console.log('--- Initializing Database ---');
  try {
    // 1. Ensure DB exists
    await ensureDatabaseExists();

    // 2. Connect to the actual DB
    const pool = new Pool({ connectionString: dbUrl });

    const schemaPath = path.join(__dirname, 'schema.sql');
    const seedPath = path.join(__dirname, 'seed.sql');

    // 3. Run Schema
    await runSqlFile(pool, schemaPath);
    // 4. Run Seed
    await runSqlFile(pool, seedPath);

    await pool.end();
    console.log('--- Database Initialization Complete ---');
  } catch (err) {
    console.error('Database initialization failed.');
    process.exit(1);
  }
};

initializeDb();
