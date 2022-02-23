import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'FerramentaRotina',
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
        tableName: 'ferramenta',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'SAS' }),
    Model.upsert({ id: 2, nome: 'Access' }),
    Model.upsert({ id: 3, nome: 'Excel' }),
    Model.upsert({ id: 4, nome: 'Mysql' }),
    Model.upsert({ id: 5, nome: 'Postgres' }),
    Model.upsert({ id: 6, nome: 'BBM' }),
    Model.upsert({ id: 7, nome: 'Power Point' }),
    Model.upsert({ id: 8, nome: 'DB2SDCOM' }),
    Model.upsert({ id: 9, nome: 'DB2SEMI1' }),
    Model.upsert({ id: 10, nome: 'Arquivo TXT' }),
    Model.upsert({ id: 11, nome: 'Robô' }),
]));

export default Model;