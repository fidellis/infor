import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Usuario from 'common/models/portal/usuario';
import UOR from 'common/models/uor/uor';
import Status from './statusMovimentacao';
import Descricao from './descricao';

const Model = sequelize.define(
    'movimentacaoDemanda',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        demanda_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },

        uorOrigem_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        uorDestino_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        status_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 1,
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
    },
    {
        scopes: {
            status: { include: [{ model: Status, as: 'status' }] },
            uorOrigem: { include: [{ model: UOR, as: 'uorOrigem' }] },
            uorDestino: { include: [{ model: UOR, as: 'uorDestino' }] },
            usuarioInclusao: { include: [{ model: Usuario, as: 'usuarioInclusao', attributes: ['id', 'nome'] }] },
            descricoes: { include: [{ model: Descricao.scope('status'), as: 'descricoes' }] },
        },
        // indexes: [{
        //     unique: true,
        //     fields: ['demanda_id', 'uor_origem_id', 'uor_destino_id', 'data_hora_inclusao'],
        // }],
        schema: 'demanda',
        tableName: 'movimentacao',
    },
);


Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(UOR, { as: 'uorOrigem', foreignKey: 'uorOrigem_id' });
Model.belongsTo(UOR, { as: 'uorDestino', foreignKey: 'uorDestino_id' });
Model.hasMany(Descricao, { as: 'descricoes', foreignKey: 'movimentacao_id' });
Descricao.belongsTo(Model, { as: 'movimentacao', foreignKey: 'movimentacao_id' });

export default Model;