'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ListaTarefas', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      codigo: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      descricao: {
        type: Sequelize.STRING(4096),
        allowNull: false
      },
      data: Sequelize.STRING,
      concluido: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      usuario: {
        type: Sequelize.BIGINT,
        field: 'usuario_id',
        allowNull: true
      },
      data_cadastro: {
        type: Sequelize.DATE,
        allowNull: null
      },
      data_atualizacao: {
        type: Sequelize.DATE,
        allowNull: null,
      }
    });
    
    return await queryInterface.addConstraint('ListaTarefas', ['usuario_id'], {
      type: 'Foreign Key',
      name: 'FK_LISTATAREFAS_USUARIO_ID001',
      references: {
        table: 'usuarios',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('ListaTarefas', 'FK_LISTATAREFAS_USUARIO_ID001');
    return queryInterface.dropTable('ListaTarefas');
  }
};
