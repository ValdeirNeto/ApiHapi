'use strict';


const jwt = require('jsonwebtoken');

const generateToken = (usuario, expiresIn) => ({
  access_token: jwt.sign({
    id: usuario.id,
    email: usuario.email,
    scope: ['public', 'admin']
  }, 'token', { expiresIn: expiresIn }),
  email: usuario.email
});

const setRedis = (client, key, value, expiresIn) => {
  client.set(key, JSON.stringify(value));
  client.expire(key, (60 * 60) * expiresIn);
};

const auth = async (request, replay) => {
  try {
    const { Usuario } = request.database;
    const payload = request.payload;

    const _usuario = await Usuario.findOne({
      where: {
        email: payload.email
      }
    });

    if (!_usuario) return replay.unauthorized();
    if (!_usuario.checarSenha(payload.senha)) return replay.unauthorized();
    
    const auth =  generateToken(_usuario, '1H');
    setRedis(request.redis, auth.access_token, auth, 60);

    return auth;

  } catch (error) {
    return replay.badImplementationCustom(error);
  }

};

module.exports = {
  auth
};