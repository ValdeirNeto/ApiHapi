'use strict';


async function list(request, replay) {
  const { Usuario } = request.database;
  return await Usuario.findAndCountAll();
}

async function get(request, replay) {
  const { Usuario } = request.database;
  const _usuario = await Usuario.findById(request.params.id);
  if (!_usuario) return replay.badRequest('Usuario nao localizado');
  return _usuario;
}

async function create(request, replay) {
  const { Usuario } = request.database;
  const _usuario = new Usuario(request.payload);
  const value = await _usuario.save();

  return replay.response(value).code(201);

}

async function update(request, replay) {
  const { Usuario } = request.database;
  const _usuario = await Usuario.findById(request.params.id);
  if (!_usuario) return replay.badRequest('Usuario nao localizado');
  await _usuario.update(request.payload);
  return _usuario;
}

async function remove(request, replay) {
  const { Usuario } = request.database;
  const _usuario = await Usuario.destroy({ where: { id: request.params.id } });
  if (!_usuario) return replay.badRequest('Usuario nao localizado');
  return _usuario;
}

module.exports = {
  list,
  get,
  create,
  update,
  remove
};