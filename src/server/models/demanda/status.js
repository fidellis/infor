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

        motivoMovimentacao: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },

        ativo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        // statusPermitidos: {
        //     type: Sequelize.ARRAY(Sequelize.INTEGER),
        //     allowNull: true,
        // },
    },
    {
        schema: 'demanda',
        tableName: 'status',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'AGUARDANDO ATENDIMENTO' }),
    Model.upsert({ id: 2, nome: 'EM ANÁLISE' }),
    Model.upsert({ id: 3, nome: 'EM EXECUÇÃO' }),
    Model.upsert({ id: 4, nome: 'CANCELADO' }),
    Model.upsert({ id: 5, nome: 'EM HOMOLOGAÇÃO' }),
    Model.upsert({ id: 6, nome: 'HOMOLOGADO' }),
    Model.upsert({ id: 7, nome: 'FINALIZADO' }),
    Model.upsert({ id: 8, nome: 'REABERTO' }),
    Model.upsert({ id: 9, nome: 'DEVOLVIDO PARA COMPLEMENTO INFORMAÇÕES', motivoMovimentacao: 'COMPLEMENTO DE INFORMAÇÕES' }),
    Model.upsert({ id: 10, nome: 'DEVOLVIDO PARA AJUSTES', motivoMovimentacao: 'AJUSTES' }),
]));

export default Model;