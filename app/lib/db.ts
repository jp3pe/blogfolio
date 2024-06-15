import mysql from 'mysql2/promise';
import nextConfig from '@/next.config.mjs';

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: nextConfig.env.MYSQL_HOST,
    user: nextConfig.env.MYSQL_USER,
    password: nextConfig.env.MYSQL_PASSWORD,
    database: nextConfig.env.MYSQL_DATABASE,
  });
  return connection;
}