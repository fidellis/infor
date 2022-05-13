import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Usuario from 'common/models/portal/usuario';
import Status from './status';
import Descricao from './descricao';

const Model = sequelize.define(
    'MovimentacaoStatusDemanda',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        movimentacao_id: {
            type: Sequelize.BIGINT,
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
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        scopes: {
            status: { include: [{ model: Status, as: 'status' }] },
            usuarioInclusao: { include: [{ model: Usuario, as: 'usuarioInclusao', attributes: ['id', 'nome'] }] },
            descricoes: { include: [{ model: Descricao.scope('usuarioInclusao'), as: 'descricoes' }] },
        },
        schema: 'demanda',
        tableName: 'movimentacao_status',
    },
);


Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.hasMany(Descricao, { as: 'descricoes', foreignKey: 'movimentacaoStatus_id' });
// Descricao.belongsTo(Model, { as: 'movimentacaoStatus', foreignKey: 'movimentacaoStatus_id' });

Model.hook("afterSave", async (movimentacaoStatus, { transaction }) => {
    const { Demanda, MovimentacaoDemanda } = sequelize.models;
    const movimentacao = await MovimentacaoDemanda.find({ where: { id: movimentacaoStatus.movimentacao_id } });
    await Demanda.update({ status_id: movimentacaoStatus.status_id }, { where: { id: movimentacao.demanda_id } });
});

export default Model;