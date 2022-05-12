import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'StatusMovimentacaoDemanad',
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

        status_id: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: false,
        },


    },
    {
        schema: 'demanda',
        tableName: 'status_movimentacao',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'ENCAMINHADO', status_id: [1, 2, 4] }),
    Model.upsert({ id: 2, nome: 'ENCAMINHADO PARA HOMOLOGAÇÃO', status_id: [5, 6] }),
    Model.upsert({ id: 3, nome: 'DEVOLVIDO PARA COMPLEMENTO INFORMAÇÕES', status_id: [3] }),
    Model.upsert({ id: 4, nome: 'DEVOLVIDO PARA AJUSTES', status_id: [1, 2, 4] }),
]));

export default Model;