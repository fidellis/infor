import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'TipoPainel',
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
        schema: 'painel',
        tableName: 'tipo',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'Web' }),
    Model.upsert({ id: 2, nome: 'Spotfire' }),
    Model.upsert({ id: 3, nome: 'PowerBI' }),
    Model.upsert({ id: 4, nome: 'Excel' }),
    Model.upsert({ id: 5, nome: 'Power Point' }),
]));


export default Model;