import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'StatusFerramenta',
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
        tableName: 'status',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'Construção​' }),
    Model.upsert({ id: 2, nome: 'Enviado​' }),
    Model.upsert({ id: 3, nome: 'Avaliado' }),
]));

export default Model;