import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Responsavel from 'common/models/portal/usuario';
import Rotina from './rotina';

const Model = sequelize.define(
    'RotinaResponsavel',
    {
        rotina_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },

        responsavel_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
    },
    {
        scopes: {
            responsavel: {
                include: [
                    {
                        model: Responsavel,
                        as: 'responsavel',
                    }
                ]
            }
        },
        schema: 'rotina',
        tableName: 'rotina_responsavel',
    },
);

// Model.belongsTo(Responsavel, { as: 'responsavel', foreignKey: 'responsavel_id' });

Model.beforeSync(() => {
    Rotina.belongsToMany(Responsavel, { through: Model, as: 'responsaveis', foreignKey: 'rotina_id', otherKey: 'responsavel_id' });
});

export default Model;