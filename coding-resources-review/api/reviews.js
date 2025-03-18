const client = require('./db');

async function createReview({ userId, resourceId, rating, comment }) {
  try {
    const { rows: [review] } = await client.query(`
      INSERT INTO reviews(user_id, resource_id, rating, comment) 
      VALUES($1, $2, $3, $4) 
      RETURNING *;
    `, [userId, resourceId, rating, comment]);

    return review;
  } catch (error) {
    throw new Error(`Error creating review: ${error.message}`);
  }
}

async function getReviewsByResourceId(resourceId) {
  try {
    const { rows } = await client.query('SELECT * FROM reviews WHERE resource_id=$1;', [resourceId]);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
}

module.exports = {
  createReview,
  getReviewsByResourceId,
};
5. Favorite Methods (favorites.js)
javascript
Copy Code
const client = require('./db');

async function addFavorite({ userId, resourceId }) {
  try {
    const { rows: [favorite] } = await client.query(`
      INSERT INTO favorites(user_id, resource_id) 
      VALUES($1, $2) 
      RETURNING *;
    `, [userId, resourceId]);

    return favorite;
  } catch (error) {
    throw new Error(`Error adding favorite: ${error.message}`);
  }
}

async function removeFavorite({ userId, resourceId }) {
  try {
    const { rows: [favorite] } = await client.query(`
      DELETE FROM favorites WHERE user_id=$1 AND resource_id=$2 RETURNING *;
    `, [userId, resourceId]);

    if (!favorite) throw new Error('Favorite not found');
    return favorite;
  } catch (error) {
    throw new Error(`Error removing favorite: ${error.message}`);
  }
}

async function getFavoritesByUserId(userId) {
  try {
    const { rows } = await client.query('SELECT * FROM favorites WHERE user_id=$1;', [userId]);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching favorites: ${error.message}`);
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesByUserId,
};