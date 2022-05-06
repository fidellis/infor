import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import UOR from 'common/models/uor/uor';
import Status from './status';

const Model = sequelize.define(
    'movimentacaoDemanda',
    {
        // id: {
        //     type: Sequelize.BIGINT,
        //     primaryKey: true,
        //     autoIncrement: true,
        // },

        demanda_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },

        uorOrigem_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        uorDestino_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        status_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },

        usuarioInclusao_id: {
            type: Sequelize.STRING(9),
            allowNull: false,
            associate: {
                model: 'Usuario',
            },
        },

        dataHoraInclusao: {
            type: Sequelize.DATE,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        scopes: {
            status: { include: [{ model: Status, as: 'status' }] },
            uorOrigem: { include: [{ model: UOR, as: 'uorOrigem' }] },
            uorDestino: { include: [{ model: UOR, as: 'uorDestino' }] },
        },
        schema: 'demanda',
        tableName: 'movimentacao',
    },
);


Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(UOR, { as: 'uorOrigem', foreignKey: 'uorOrigem_id' });
Model.belongsTo(UOR, { as: 'uorDestino', foreignKey: 'uorDestino_id' });
export default Model;