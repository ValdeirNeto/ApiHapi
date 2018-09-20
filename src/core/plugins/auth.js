'use strict';

//const jsonWebToken = require('jsonwebtoken');

module.exports = {
  register: async (server) => {
    await server.register(require('hapi-auth-jwt2'));

    const validate = async function (decoded, request) {
      const token = request.headers.authorization;
      const { Usuario } = request.database;
      const redis = request.redis;

      const _existe = await redis.getAsync(token);
      if (!_existe) return { isValid: false };

      const _usuario = await Usuario.findOne({
        where: {
          email: decoded.email
        }
      });
      if (!_usuario) return { isValid: false };
      return { isValid: true };
    };

    server.auth.strategy('jwt', 'jwt', {
      key: 'token',
      validate: validate,
      verifyOptions: {
        algorithms: ['HS256']
      }
    });

    server.auth.default('jwt');
  },
  name: 'auth',
  version: '1.0.0'
};