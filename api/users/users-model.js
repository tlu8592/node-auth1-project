const db = require('../../data/db-config');

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  // SELECT user_id AND username FROM users
  return db('users').select(['user_id', 'username']);
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return db('users').where('filter', filter);
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return db('users')
    .select(['user_id', 'username'])
    .where('user_id', user_id)
    .first();
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const userId = await db('users').insert(user);
  return db('users').where('user_id', userId).first();
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find,
  findBy,
  findById,
  add
}