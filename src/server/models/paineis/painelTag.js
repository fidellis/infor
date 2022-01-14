import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Painel from './painel';
import Tag from './tag';

const Model = sequelize.define(
    'PainelTag',
    {
        painel_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },

        tag_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
    },
    {
        scopes: {
            tag: {
                include: [
                    {
                        model: Tag,
                        as: 'tag',
                    }
                ]
            }
        },
        schema: 'paineis',
        tableName: 'painel_tag',
    },
);

// Model.belongsTo(Tag, { as: 'tag', foreignKey: 'tag_id' });

Model.beforeSync(() => {
    Painel.belongsToMany(Tag, { through: Model, as: 'tags', foreignKey: 'painel_id', otherKey: 'tag_id' });
});

export default Model;