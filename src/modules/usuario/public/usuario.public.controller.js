'use strict';

async function list (request, replay) {
  const { Usuario } = request.database;
  return await Usuario.findAndCountAll();
}

async function get (request, replay) {
  const { Usuario } = request.database;
  const credentials = request.auth.credentials;
  const _usuario =  await Usuario.findById(credentials.id);
  if(!_usuario) return replay.badRequest('Usuario nao localizado');
  return _usuario;
}
module.exports = {
  list,
  get,
};