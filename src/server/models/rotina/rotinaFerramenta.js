import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Rotina from './rotina';
import Ferramenta from './ferramenta';

const Model = sequelize.define(
    'RotinaFerramenta',
    {
        rotina_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },

        ferramenta_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
    },
    {
        scopes: {
            ferramenta: {
                include: [
                    {
                        model: Ferramenta,
                        as: 'ferramenta',
                    }
                ]
            }
        },
        schema: 'rotina',
        tableName: 'rotina_ferramenta',
    },
);

// Model.belongsTo(Ferramenta, { as: 'ferramenta', foreignKey: 'ferramenta_id' });

Model.beforeSync(() => {
    Rotina.belongsToMany(Ferramenta, { through: Model, as: 'ferramentas', foreignKey: 'rotina_id', otherKey: 'ferramenta_id' });
});

export default Model;