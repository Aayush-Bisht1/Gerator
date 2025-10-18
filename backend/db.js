import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

export async function getDevices(){
    const [rows] = await pool.query('SELECT * FROM devices');
    return rows;
}

export async function getDeviceById(id){
    const [rows] = await pool.query(`SELECT * FROM devices WHERE id = ?`, [id]);
    return rows[0];
}

export async function getUserByEmail(email){
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
}

export async function createUser(email, password_hash){
    const [result] = await pool.query(`INSERT INTO users (email, password_hash) VALUES (?, ?)`, [email, password_hash]);
    return result.insertId;
}

export { pool };