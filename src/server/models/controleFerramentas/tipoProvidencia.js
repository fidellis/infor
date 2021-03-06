import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'TipoProvidencia',
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
        tableName: 'tipo_providencia',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'Atualização' }),
    Model.upsert({ id: 2, nome: 'Criação ' }),
    Model.upsert({ id: 3, nome: 'Otimização ' }),
]));

export default Model;