const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dbUrl = process.env.DATABASE_URL;
const isRemote = dbUrl.includes('render.com') || dbUrl.includes('elephantsql.com');

const ensureDatabaseExists = async () => {
  if (isRemote) {
    console.log('Remote database detected. Skipping database creation check.');
    return;
  }

  const baseDbUrl = dbUrl.substring(0, dbUrl.lastIndexOf('/')) + '/postgres';
  const targetDbName = dbUrl.substring(dbUrl.lastIndexOf('/') + 1);
  
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
    await ensureDatabaseExists();

    const pool = new Pool({ 
      connectionString: dbUrl,
      ssl: isRemote ? { rejectUnauthorized: false } : false
    });

    const schemaPath = path.join(__dirname, 'schema.sql');
    const seedPath = path.join(__dirname, 'seed.sql');

    await runSqlFile(pool, schemaPath);
    await runSqlFile(pool, seedPath);

    await pool.end();
    console.log('--- Database Initialization Complete ---');
  } catch (err) {
    console.error('Database initialization failed.');
    process.exit(1);
  }
};

initializeDb();
