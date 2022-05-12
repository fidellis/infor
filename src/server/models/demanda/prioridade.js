import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'PrioridadeDemanda',
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
        schema: 'demanda',
        tableName: 'prioridade',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'Baixa' }),
    Model.upsert({ id: 2, nome: 'Normal' }),
    Model.upsert({ id: 3, nome: 'Alta' }),
]));

export default Model;