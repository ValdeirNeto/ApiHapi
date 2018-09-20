'use strict';

const Joi = require('joi');
const Schema = require('../listaTarefas.schema');

const schema = Schema.getSchema();

const create = () => ({
  payload: Joi.object({
    codigo: schema.codigo.optional(),
    descricao: schema.descricao.required(),
    data: schema.data.optional(),
    concluido: schema.concluido.optional(),
    usuario: schema.usuario.optional(),
  }).label('CadastroListaTarefas')
});

const update = () => ({
  params: {
    id: schema.id.required()
  },
  payload: Joi.object({
    descricao: schema.descricao.required(),
    data: schema.data.optional(),
    usuario: schema.usuario.optional(),
  }).label('UpdateListaTarefas')
});

const get = () => ({
  params: {
    id: schema.id.required()
  }
});
module.exports = {
  create,
  update,
  get
};