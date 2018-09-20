'use strict';

async function list(request, replay) {
  try {
    const { Usuario } = request.database;
    return await Usuario.findAndCountAll();

  } catch (error) {
    return replay.badImplementationCustom(error);
  }

}

async function get(request, replay) {
  try {
    const { Usuario } = request.database;
    const credentials = request.auth.credentials;
    const _usuario = await Usuario.findById(credentials.id);
    if (!_usuario) return replay.badRequest('Usuario nao localizado');
    return _usuario;
    
  } catch (error) {
    return replay.badImplementationCustom(error);

  }

}
module.exports = {
  list,
  get,
};