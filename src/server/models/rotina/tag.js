import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'TagRotina',
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
        tableName: 'tag',
    },
);

// Model.afterSync(() => Promise.all([
//     Model.upsert({ id: 1, nome: 'Tag 1' }),    
// ]));

export default Model;