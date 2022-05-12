import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Usuario from 'common/models/portal/usuario';
import Status from './status';

const Model = sequelize.define(
    'DescricaoDemanda',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        movimentacao_id: {
            type: Sequelize.BIGINT,
        },

        status_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 1,
        },

        descricao: {
            type: Sequelize.TEXT,
            allowNull: true,
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
        },
        schema: 'demanda',
        tableName: 'descricao',
    },
);


Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });

Model.hook("afterSave", async (descricao, { transaction }) => {
    const { Demanda, MovimentacaoDemanda } = sequelize.models;
    const movimentacao = await MovimentacaoDemanda.find({ where: { id: descricao.movimentacao_id } });
    await Demanda.update({ status_id: descricao.status_id }, { where: { id: movimentacao.demanda_id } });
});

export default Model;