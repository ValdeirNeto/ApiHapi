'use strict';

const Joi = require('joi');

const schema = {
  id: Joi.number().integer().min(0),
  codigo: Joi.string().trim().uuid(),
  data: Joi.string(),
  descricao: Joi.string().trim().min(0).max(4096),
  concluido: Joi.boolean(),
  usuario: Joi.number().integer().min(0),
  data_cadastro: Joi.date().iso(),
  data_atualizacao: Joi.date().iso()
};

const getSchema = () => ( schema );

module.exports = {
  getSchema
};