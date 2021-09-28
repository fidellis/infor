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
  Model.upsert({ id: 1, nome: 'Solução 1​' }),
  Model.upsert({ id: 2, nome: 'Solução 2​' }),
]));

export default Model;