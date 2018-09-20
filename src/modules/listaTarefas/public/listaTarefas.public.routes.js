'use strict';

const Controller = require('./listaTarefas.public.controller');
const Validator = require('./listaTarefas.public.validation');

module.exports = {
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/listaTarefas',
        config: {
          auth: {
            scope: ['public']
          },
          description: 'Listando o listaTarefas',
          notes: 'retorna a lista de listaTarefas',
          tags: ['api'],
          handler: Controller.list
        },
      },
      {
        method: 'GET',
        path: '/listaTarefas/{id}',
        config: {
          auth: {
            scope: ['public']
          },
          description: 'Listando o listaTarefas',
          notes: 'retorna a lista de listaTarefas',
          tags: ['api'],
          handler: Controller.get,
          validate: Validator.get()
        },
      },
      {
        method: 'POST',
        path: '/listaTarefas',
        config: {
          auth: {
            scope: ['public']
          },
          description: 'Criando o listaTarefas',
          notes: 'Criando o listaTarefas',
          tags: ['api'],
          handler: Controller.create,
          validate: Validator.create()
        }
      },
      {
        method: ['PUT', 'PATCH'],
        path: '/listaTarefas/{id}',
        config: {
          auth: {
            scope: ['public']
          },
          description: 'Atualiza o listaTarefas',
          notes: 'Atualiza o listaTarefas',
          tags: ['api'],
          handler: Controller.update,
          validate: Validator.update()
        }
      },
      {
        method: 'DELETE',
        path: '/listaTarefas/{id}',
        config: {
          auth: {
            scope: ['public']
          },
          description: 'Deletando o listaTarefas',
          notes: 'deletendo de listaTarefas',
          tags: ['api'],
          handler: Controller.remove,
          validate: Validator.get()
        },
      }, 
    ]
    );
  },
  name: 'listaTarefas-public-route',
  version: '1.0.0'
};