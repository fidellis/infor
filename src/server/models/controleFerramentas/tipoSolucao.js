import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
  'TipoSolucao',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    nome: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    ativo: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    schema: 'controle_ferramentas_infor',
    tableName: 'tipo_solucao',
  },
);

Model.afterSync(() => Promise.all([
  Model.upsert({ id: 1, nome: 'PowerBI' }),
  Model.upsert({ id: 2, nome: 'Relatório' }),
  Model.upsert({ id: 3, nome: 'Robô' }),
  Model.upsert({ id: 4, nome: 'SAS/Excel' }),
  Model.upsert({ id: 5, nome: 'SAS/PowerBI' }),
  Model.upsert({ id: 6, nome: 'SAS/SpotFire' }),
  Model.upsert({ id: 7, nome: 'SAS/Web' }),
  Model.upsert({ id: 8, nome: 'Web' }),
  Model.upsert({ id: 9, nome: 'Descontinuação' }),
]));

export default Model;