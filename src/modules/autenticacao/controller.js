'use strict';


const jwt = require('jsonwebtoken');

const generateToken = (usuario, expiresIn) => ({
  access_token: jwt.sign({
    email: usuario.email,
    scope: ['public', 'admin']
  }, 'token', {expiresIn: expiresIn}),
  email: usuario.email
});

const auth = async (request, replay) => {
  const { Usuario } = request.database;
  const payload = request.payload;

  const _usuario = await Usuario.findOne({
    where: {
      email: payload.email
    }
  });

  if(!_usuario) return replay.unauthorized();
  if(!_usuario.checarSenha(payload.senha)) return replay.unauthorized();

  return generateToken(_usuario, '1H');

};

module.exports = {
  auth
};