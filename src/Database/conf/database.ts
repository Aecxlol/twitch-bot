import {dbConf} from '../../Interface/DbConfInterface';
import * as dotenv from 'dotenv';

dotenv.config()

/**
 * Define the database's configuration
 */
export const DB_CONF: dbConf = {
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}