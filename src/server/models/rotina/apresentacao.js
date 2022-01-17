import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'ApresentacaoRotina',
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
        tableName: 'apresentacao',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'Painel' }),
    Model.upsert({ id: 2, nome: 'E-mail' }),
    Model.upsert({ id: 3, nome: 'BBM' }),
]));

export default Model;