import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'StatusDemanda',
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

        statusMovimentacao_id: {
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
    Model.upsert({ id: 1, nome: 'AGUARDANDO ATENDIMENTO', statusMovimentacao_id: [1, 4] }),
    Model.upsert({ id: 2, nome: 'EM ANÁLISE', statusMovimentacao_id: [1, 4] }),
    Model.upsert({ id: 3, nome: 'DEVOLVIDO', statusMovimentacao_id: [3] }),
    Model.upsert({ id: 4, nome: 'EM EXECUÇÃO', statusMovimentacao_id: [1, 4] }),
    Model.upsert({ id: 5, nome: 'EM HOMOLOGAÇÃO', statusMovimentacao_id: [2] }),
    Model.upsert({ id: 6, nome: 'HOMOLOGADO', statusMovimentacao_id: [2] }),
    Model.upsert({ id: 7, nome: 'FINALIZADO' }),
    Model.upsert({ id: 8, nome: 'CANCELADO' }),
    Model.upsert({ id: 9, nome: 'REABERTO' }),
]));

export default Model;