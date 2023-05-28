import * as defaults from './defaults';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || defaults.PORT;
export const JWT_SECRET = process.env.JWT_SECRET || defaults.JWT_SECRET;
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || defaults.MONGO_CONNECTION_STRING;
export const IS_PROD = process.env.NODE_ENV === 'production' || defaults.IS_PROD;
export const CLIENT_URL = process.env.CLIENT_URL || defaults.CLIENT_URL;
