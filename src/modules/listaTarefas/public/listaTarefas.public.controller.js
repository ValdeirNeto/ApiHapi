'use strict';


async function list(request, replay) {
  try {
    const { ListaTarefas, Usuario } = request.database;
  
    const teste1 = await ListaTarefas.findAll({
      offset: request.offset(),
      limit: request.limit(),
      include: [{
        model: Usuario,
        as: 'Usuarios',
      }]
    }); 
  
    return teste1;    
  } catch (err) {
    return err;
  }

}

async function get(request, replay) {
  const { ListaTarefas } = request.database;
  const _listaTarefas = await ListaTarefas.findById(request.params.id);
  if (!_listaTarefas) return replay.badRequest('Lista Tarefa nao localizado');
  return _listaTarefas;
}

async function create(request, replay) {
  const { ListaTarefas } = request.database;
  const credentials = request.auth.credentials;
  const payload = request.payload;

  payload.usuario = credentials.id;

  const _listaTarefas = new ListaTarefas(request.payload);
  const value = await _listaTarefas.save();

  return replay.response(value).code(201);

}

async function update(request, replay) {
  const { ListaTarefas } = request.database;
  const _listaTarefas = await ListaTarefas.findById(request.params.id);
  if (!_listaTarefas) return replay.badRequest('Lista Tarefa nao localizado');
  await _listaTarefas.update(request.payload);
  return _listaTarefas;
}

async function remove(request, replay) {
  const { ListaTarefas } = request.database;
  const _listaTarefas = await ListaTarefas.destroy({ where: { id: request.params.id } });
  if (!_listaTarefas) return replay.badRequest('Lista Tarefa nao localizado');
  return _listaTarefas;
}

module.exports = {
  list,
  get,
  create,
  update,
  remove
};