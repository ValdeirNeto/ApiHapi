'use strict';

/* eslint no-console: ["error", { allow: ["log", "warn", "error" ]}] */

const redis = require('redis');
const { getRedisConfig } = require('./utils/load');

const config = getRedisConfig();
const client = redis.createClient(config.port, config.host);

client.on('error', function(err) {
  console.log('Regis-Error: ', err);
});

client.on('connect', function(){
  console.log('Redis connect');
});

module.exports = client;