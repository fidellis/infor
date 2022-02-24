import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Responsavel from 'common/models/portal/usuario';
import Rotina from './rotina';
import Tipo from './tipoResponsavel';

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

        tipo_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            defaultValue: 1,
        },
    },
    {
        defaultScope: {
            responsavel: {
                include: [
                    {
                        model: Responsavel,
                        as: 'responsavel',
                    }
                ]
            }
        },
        // scopes: {
        //     responsavel: {
        //         include: [
        //             {
        //                 model: Responsavel,
        //                 as: 'responsavel',
        //             }
        //         ]
        //     }
        // },
        schema: 'rotina',
        tableName: 'rotina_responsavel',
    },
);

Model.belongsTo(Responsavel, { as: 'responsavel', foreignKey: 'responsavel_id' });
Model.belongsTo(Tipo, { as: 'tipo', foreignKey: 'tipo_id' });

Model.beforeSync(() => {
    Rotina.belongsToMany(Responsavel, { through: Model, as: 'responsaveis', foreignKey: 'rotina_id', otherKey: 'responsavel_id' });
});

export default Model;