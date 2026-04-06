import { pool } from '../db/connection.js';

export const getCustomersQuery = async ({ search, sortBy, order, limit, offset }) => {
  const searchQuery = `%${search}%`;

  const dataQuery = `
    SELECT *
    FROM customers
    WHERE first_name ILIKE $1
       OR last_name ILIKE $1
       OR email ILIKE $1
       OR company ILIKE $1
       OR city ILIKE $1
    ORDER BY ${sortBy} ${order}
    LIMIT $2 OFFSET $3
  `;

  const countQuery = `
    SELECT COUNT(*)
    FROM customers
    WHERE first_name ILIKE $1
       OR last_name ILIKE $1
       OR email ILIKE $1
       OR company ILIKE $1
       OR city ILIKE $1
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, [searchQuery, limit, offset]),
    pool.query(countQuery, [searchQuery]),
  ]);

  return {
    data: dataResult.rows,
    totalItems: parseInt(countResult.rows[0].count, 10),
  };
};
