'use strict';


async function list(request, replay) {
  try {
    const { ListaTarefas, Usuario } = request.database;

    const value = await ListaTarefas.findAll({
      offset: request.offset(),
      limit: request.limit(),
      include: [{
        model: Usuario,
        as: 'Usuarios',
      }]
    });

    return value;
  } catch (err) {
    return replay.badImplementationCustom(err);
  }

}

async function get(request, replay) {
  try {
    const { ListaTarefas } = request.database;
    const _listaTarefas = await ListaTarefas.findById(request.params.id);
    if (!_listaTarefas) return replay.badRequest('Lista Tarefa nao localizado');
    return _listaTarefas;

  } catch (error) {
    return replay.badImplementationCustom(error);
  }

}

async function create(request, replay) {
  try {

    const { ListaTarefas } = request.database;
    const credentials = request.auth.credentials;
    const payload = request.payload;

    payload.usuario = credentials.id;

    const _listaTarefas = new ListaTarefas(request.payload);
    const value = await _listaTarefas.save();

    return replay.response(value).code(201);

  } catch (error) {
    return replay.badImplementationCustom(error);
  }
}
async function update(request, replay) {
  try {
    const { ListaTarefas } = request.database;
    const _listaTarefas = await ListaTarefas.findById(request.params.id);
    if (!_listaTarefas) return replay.badRequest('Lista Tarefa nao localizado');
    await _listaTarefas.update(request.payload);
    return _listaTarefas;
  } catch (error) {
    return replay.badImplementationCustom(error);
  }
}

async function remove(request, replay) {
  try {
    const { ListaTarefas } = request.database;
    const _listaTarefas = await ListaTarefas.destroy({ where: { id: request.params.id } });
    if (!_listaTarefas) return replay.badRequest('Lista Tarefa nao localizado');
    return _listaTarefas;
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