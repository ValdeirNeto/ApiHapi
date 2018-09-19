'use strict';

const Joi = require('joi');
const Schema = require('./schema');

const schema = Schema.getSchema();

const auth = () => ({
  payload: Joi.object({
    email: schema.email.required(),
    senha: schema.senha.required()
  }).label('atutenticacao')
});



module.exports = {
  auth
};