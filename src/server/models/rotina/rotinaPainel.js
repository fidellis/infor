import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Painel from '../painel/painel';
import Rotina from './rotina';

const Model = sequelize.define(
    'RotinaPainel',
    {
        rotina_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },

        painel_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
    },
    {
        scopes: {
            painel: {
                include: [
                    {
                        model: Painel,
                        as: 'painel',
                    }
                ]
            }
        },
        schema: 'rotina',
        tableName: 'rotina_painel',
    },
);

// Model.belongsTo(Painel, { as: 'painel', foreignKey: 'painel_id' });

Model.beforeSync(() => {
    Rotina.belongsToMany(Painel, { through: Model, as: 'paineis', foreignKey: 'rotina_id', otherKey: 'painel_id' });
});

export default Model;