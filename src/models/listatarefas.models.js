'use strict';


module.exports = (sequelize, DataTypes) => {
  const ListaTarefas = sequelize.define('ListaTarefas', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    descricao: {
      type: DataTypes.STRING(4096),
      allowNull: false
    },
    data: DataTypes.STRING,
    concluido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    usuario: {
      type: DataTypes.BIGINT,
      field: 'usuario_id',
      allowNull: true
    },
  },{
    tableName: 'ListaTarefas',
    freezeTableName: true,
    createdAt: 'data_cadastro',
    updatedAt: 'data_atualizacao',
    schema: 'public',
    
    scope: {
      Usuario: function (usuarioId) {
        return {
          where: {
            usuario: usuarioId
          }
        };
      }
    },
  });

 
  ListaTarefas.associate = function (models) {
    models.Usuario.hasMany(models.ListaTarefas, { foreignKey: 'id', as: 'ListaTarefas' });
    models.ListaTarefas.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'Usuarios' });
  };


  return ListaTarefas;
};