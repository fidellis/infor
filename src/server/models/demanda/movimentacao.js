import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Usuario from 'common/models/portal/usuario';
import UOR from 'common/models/uor/uor';
import Status from './statusMovimentacao';
import MovimentacaoStatus from './movimentacaoStatus';

const Model = sequelize.define(
    'MovimentacaoDemanda',
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
            uorOrigem: { include: [{ model: UOR, as: 'uorOrigem', attributes: ['id', 'nome', 'nomeReduzido'] }] },
            uorDestino: { include: [{ model: UOR, as: 'uorDestino', attributes: ['id', 'nome', 'nomeReduzido'] }] },
            usuarioInclusao: { include: [{ model: Usuario, as: 'usuarioInclusao', attributes: ['id', 'nome'] }] },
            movimentacoesStatus: { include: [{ model: MovimentacaoStatus.scope('status', 'usuarioInclusao', 'descricoes'), as: 'movimentacoesStatus' }] },
        },
        // indexes: [{
        //     unique: true,
        //     fields: ['demanda_id', 'uor_origem_id', 'uor_destino_id', 'data_hora_inclusao'],
        // }],
        schema: 'demanda',
        tableName: 'movimentacao',
    },
);

Model.hook("afterSave", async (movimentacao, { transaction }) => {
    const { Demanda } = sequelize.models;
    await Demanda.update({ statusMovimentacao_id: movimentacao.status_id, uorOrigemAtual_id: movimentacao.uorOrigem_id, uorDestinoAtual_id: movimentacao.uorDestino_id }, { where: { id: movimentacao.demanda_id } });
});


Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(UOR, { as: 'uorOrigem', foreignKey: 'uorOrigem_id' });
Model.belongsTo(UOR, { as: 'uorDestino', foreignKey: 'uorDestino_id' });
Model.hasMany(MovimentacaoStatus, { as: 'movimentacoesStatus', foreignKey: 'movimentacao_id' });
// MovimentacaoStatus.belongsTo(Model, { as: 'movimentacao', foreignKey: 'movimentacao_id' });

export default Model;