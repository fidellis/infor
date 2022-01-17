import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'StatusPainel',
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
        schema: 'paineis',
        tableName: 'status',
    },
);

// Model.afterSync(() => Promise.all([
//     Model.upsert({ id: 1, nome: 'Construção​' }),
//     Model.upsert({ id: 2, nome: 'Homologação' }),
//     Model.upsert({ id: 3, nome: 'Concluído' }),
// ]));

export default Model;