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
    const _usuario = await Usuario.findById(request.params.id);
    if (!_usuario) return replay.badRequest('Usuario nao localizado');
    return _usuario;

  } catch (error) {
    return replay.badImplementationCustom(error);
  }

}

async function create(request, replay) {
  try {
    const { Usuario } = request.database;
    const _usuario = new Usuario(request.payload);
    const value = await _usuario.save();

    return replay.response(value).code(201);

  } catch (error) {
    return replay.badImplementationCustom(error);
  }


}

async function update(request, replay) {
  try {
    const { Usuario } = request.database;
    const _usuario = await Usuario.findById(request.params.id);
    if (!_usuario) return replay.badRequest('Usuario nao localizado');
    await _usuario.update(request.payload);
    return _usuario;

  } catch (error) {
    return replay.badImplementationCustom(error);
  }
}

async function remove(request, replay) {
  try {
    const { Usuario } = request.database;
    const _usuario = await Usuario.destroy({ where: { id: request.params.id } });
    if (!_usuario) return replay.badRequest('Usuario nao localizado');
    return _usuario;
    
  } catch (error) {
    return replay.badImplementationCustom(error);
  }

}

module.exports = {
  list,
  get,
  create,
  update,
  remove
};