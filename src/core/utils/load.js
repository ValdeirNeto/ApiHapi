'use strict';

const dotenv = require('dotenv');

dotenv.load({ silent: true });
const getServer = () => ({
  host: process.env['SERVER_HOST'] || '0.0.0.0',
  port: process.env['SERVER_PORT'] || 3000
});

const getDatabase = () => ({
  host: process.env['DATABASE_HOST'] || 'localhost',
  port: process.env['DATABASE_PORT'] || 5432,
  username: process.env['DATABASE_USERNAME'] || '',
  password: process.env['DATABASE_PASSWORD'] || '',
  database: process.env['DATABASE_NAME'] || ''
});

const getRedisConfig = () => ({
  host: process.env['REDIS_HOST'] || '127.0.0.1',
  port: process.env['REDIS_PORT'] || 6379,
});

module.exports = {
  getServer,
  getDatabase,
  getRedisConfig
};