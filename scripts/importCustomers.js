// scripts/importCustomers.js
import fs from 'fs';
import csv from 'csv-parser';
import { pool } from '../src/db/connection.js';



fs.createReadStream('data/customers.csv')
  .pipe(csv())
  .on('data', async (row) => {
    const {
  first_name,
  last_name,
  email,
  gender,
  ip_address,
  company,
  city,
  title,
  website,
  id: external_id
} = row;
    await pool.query(
    `INSERT INTO customers(
      first_name,last_name,email,gender,ip_address,company,city,title,website,external_id) 
      VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        first_name,
        last_name,
        email,
        gender,
        ip_address,
        company,
        city,
        title,
        website,
        external_id
      ]
    );
  })
  .on('end', () => {
    console.log('Import complete');
  });