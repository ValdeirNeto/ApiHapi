'use strict';

/* eslint no-console: ["error", { allow: ["log", "warn", "error" ]}] */

const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const Server = require('./server');
const { getDatabase } = require('./utils/load');
const { funcaoPlugin, filterCoreDirectories } = require('./utils/core-function');

console.log(`Running envroment ${process.env.NODE_ENV || 'dev'}`);

const start = async () => {
  try {
    const server = await Server.init();

    await corePlugins(server);
    await routePlugins(server);

    if(process.env.NODE_ENV === 'test') return server;

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(`====> Error starting server: ${err}`);
  }
};

const corePlugins = async(server) => {
  console.log('===> load core plugins');
  try {
    const dir = path.join(__dirname, './plugins');
    const plugins = fs.readdirSync(dir).filter(funcaoPlugin);

    let pluginsPromisse = [];
    plugins.forEach((item) => {
      const plugin = require(path.join(dir, item));
      pluginsPromisse.push(server.register(plugin));
    });

    const config = getDatabase();
      
    await server.register([
      {plugin: require('hapi-boom-decorators')},
      {
        plugin: require('./plugins/database'),
        options: {
          database: config.database,
          username: config.username,
          password: config.password,
          host: config.host,
          port: config.port
        } 
      },
      { plugin: require('./plugins/auth') }
    ]);
    
    return await Promise.all(pluginsPromisse);
  } catch (error) {
    console.log('===> error load plugins');
  }
};

const routePlugins = async (server) => {
  console.log('===> load plugin routes');
  try {
    const dir = path.join(__dirname, '..');
    const routers = fs.readdirSync(dir).filter(filterCoreDirectories);

    let routersPromise = [];
    routers.forEach((item) => {
      const plugin = require(path.join(dir, item));
      routersPromise.push(server.register(plugin));
    });
    return await Promise.all(routersPromise);
  } catch (error) {
    console.log(`====> error load plugins routes ${error}`);
  }
};

module.exports = { start };