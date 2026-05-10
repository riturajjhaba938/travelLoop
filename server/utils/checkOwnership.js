const db = require('../config/db');

const ALLOWED_TABLES = ['checklist_items', 'trip_notes', 'trip_sections', 'expenses'];

/**
 * Utility to verify if a user owns a trip.
 * @param {number} tripId 
 * @param {number} userId 
 * @returns {boolean}
 */
exports.checkTripOwnership = async (tripId, userId) => {
  const result = await db.query('SELECT user_id FROM trips WHERE id = $1', [tripId]);
  if (result.rows.length === 0) return false;
  return result.rows[0].user_id === parseInt(userId);
};

/**
 * Utility to check if a user owns an entity (note, section, etc) via trip relationship.
 * @param {string} table 
 * @param {number} id 
 * @param {number} userId 
 * @returns {boolean}
 */
exports.checkEntityOwnership = async (table, id, userId) => {
  if (!ALLOWED_TABLES.includes(table)) {
    throw new Error(`Forbidden table access: ${table}`);
  }

  const result = await db.query(
    `SELECT t.user_id FROM ${table} e JOIN trips t ON e.trip_id = t.id WHERE e.id = $1`,
    [id]
  );
  if (result.rows.length === 0) return false;
  return result.rows[0].user_id === parseInt(userId);
};
