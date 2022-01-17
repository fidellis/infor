import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
  'TipoRotina',
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
    schema: 'rotina',
    tableName: 'tipo',
  },
);

Model.afterSync(() => Promise.all([
  Model.upsert({ id: 1, nome: 'PJ' }),
  Model.upsert({ id: 2, nome: 'PF' }),
  Model.upsert({ id: 3, nome: 'Imobiliário' }),
  Model.upsert({ id: 4, nome: 'Demais' }),
]));

export default Model;