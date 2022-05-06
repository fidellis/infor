import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'statusDemanda',
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

        statusMovimentaca_id: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: true,
        },
    },
    {
        schema: 'demanda',
        tableName: 'status',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'Aguardando atendimento', statusMovimentaca_id: [1, 4] }),
    Model.upsert({ id: 2, nome: 'Em análise', statusMovimentaca_id: [1, 4] }),
    Model.upsert({ id: 3, nome: 'Devolvido', statusMovimentaca_id: [3] }),
    Model.upsert({ id: 4, nome: 'Em execução', statusMovimentaca_id: [1, 4] }),
    Model.upsert({ id: 5, nome: 'Em homologação', statusMovimentaca_id: [2] }),
    Model.upsert({ id: 6, nome: 'Homologado', statusMovimentaca_id: [2] }),
    Model.upsert({ id: 7, nome: 'Finalizado' }),
    Model.upsert({ id: 8, nome: 'Cancelado' }),
]));

export default Model;