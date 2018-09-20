'use strict';

/* eslint no-console: ["error", { allow: ["log", "warn", "error" ]}] */

const promisse = require('bluebird');

const redis = require('redis');
const { getRedisConfig } = require('./../utils/load');
const config = getRedisConfig();

promisse.promisifyAll(redis.RedisClient.prototype);
promisse.promisifyAll(redis.Multi.prototype);

module.exports = {
  register: async (server) => {
    const client = redis.createClient(config.port, config.host);

    client.on('error', function (err) {
      console.log('Regis-Error: ', err);
    });

    client.on('connect', function () {
      console.log('Redis connect');
    });

    return await server.decorate('request', 'redis', client);
  },
  name: 'hapi-redis',
  version: '1.0.0'
};