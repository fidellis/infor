import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Version from 'common/sequelize/version';
import Usuario from 'common/models/portal/usuario';
import UOR from 'common/models/uor/uor';
import Status from './status';
import Movimentacao from './movimentacao';

const Model = sequelize.define(
    'demanda',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        titulo: {
            type: Sequelize.STRING(255),
            allowNull: false,
            // unique: true,
        },

        tipo_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        status_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        uorInclusao_id: {
            type: Sequelize.INTEGER,
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
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },

        uorResponsavel_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        usuarioAlteracao_id: {
            type: Sequelize.STRING(9),
            allowNull: true,
            associate: {
                model: 'Usuario',
            },
        },

        dataHoraAlteracao: {
            type: Sequelize.DATE,
            allowNull: true,
        },


    },
    {
        scopes: {
            status: { include: [{ model: Status, as: 'status' }] },
            uorInclusao: { include: [{ model: UOR, as: 'uorInclusao' }] },
            uorResponsavel: { include: [{ model: UOR, as: 'uorResponsavel' }] },
            status: { include: [{ model: Movimentacao.scope('status'), as: 'movimentacao' }] },
        },
        schema: 'demanda',
        tableName: 'demanda',
    },
);

Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(UOR, { as: 'uorInclusao', foreignKey: 'uorInclusao_id' });
Model.belongsTo(UOR, { as: 'uorResponsavel', foreignKey: 'uorResponsavel_id' });
Model.hasMany(Movimentacao, { as: 'movimentacao', foreignKey: 'demanda_id' });

const ModelVersion = new Version(Model);
ModelVersion.sync();
export default Model;