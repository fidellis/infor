import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Rotina from './rotina';
import Tag from './tag';

const Model = sequelize.define(
    'RotinaTag',
    {
        rotina_id: {
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
        schema: 'rotina',
        tableName: 'rotina_tag',
    },
);

// Model.belongsTo(Tag, { as: 'tag', foreignKey: 'tag_id' });

Model.beforeSync(() => {
    Rotina.belongsToMany(Tag, { through: Model, as: 'tags', foreignKey: 'rotina_id', otherKey: 'tag_id' });
});

export default Model;