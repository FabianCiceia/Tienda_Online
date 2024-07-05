const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const config = require('./config');

const pool = new Pool(config);

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
        return console.error('Error executing query', err.stack);
        }
        console.log(result.rows);
    });
});

const createTables = async () => {
    try {
        // Crear tabla location
        await pool.query(`
            CREATE TABLE location (
                id BIGSERIAL PRIMARY KEY,
                longitude DOUBLE PRECISION,
                latitude DOUBLE PRECISION
            )
        `);
        console.log('Table location created successfully');

        // Crear tabla user_address
        await pool.query(`
            CREATE TABLE user_address (
                id BIGSERIAL PRIMARY KEY,
                user_id BIGINT REFERENCES users(id),
                address VARCHAR(150),
                reference VARCHAR(100),
                location_id BIGINT REFERENCES location(id),
                removed BOOLEAN
            )
        `);
        console.log('Table user_address created successfully');

    } catch (err) {
        console.error('Error creating tables', err.stack);
    } finally {
        pool.end();
    }
};

createTables();



// const insertUser = (name, lastname, email, password, document, phone, enabled) => {
//     const query = `
//         INSERT INTO users (name, lastname, email, password, document, phone, enabled)
//         VALUES ($1, $2, $3, $4, $5, $6, $7)
//         RETURNING *;
//     `;
//     const values = [name, lastname, email, password, document, phone, enabled];

//     pool.query(query, values, (err, res) => {
//         if (err) {
//             console.error('Error inserting data', err.stack);
//         } else {
//             console.log('User inserted successfully:', res.rows[0]);
//         }
//     });
// };

// // Ejemplo de uso
// insertUser('John', 'Doe', 'john.doe@example.com', 'password123', '123456789', '555-555-5555', true);

// pool.query(`
//     CREATE TABLE users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100),
//         lastname VARCHAR(100),
//         email VARCHAR(150) UNIQUE,
//         password VARCHAR(100),
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         document VARCHAR(15),
//         phone VARCHAR(20),
//         enabled BOOL
//     )
//     `, (err, res) => {
//     if (err) {
//         console.error('Error creating table', err.stack);
//     } else {
//         console.log('Table created successfully');
//     }
// });
