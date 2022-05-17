import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Version from 'common/sequelize/version';
import Usuario from 'common/models/portal/usuario';
import UOR from 'common/models/uor/uor';
import Status from './status';
// import TipoMovimentacao from './tipoMovimentacao';
import Prioridade from './prioridade';
import Movimentacao from './movimentacao';
import Responsavel from './responsavel';


const Model = sequelize.define(
    'Demanda',
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

        // tipoMovimentacao_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 1,
        // },

        status_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        prioridade_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2,
        },

        uorOrigem_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        uorDestino_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        uorOrigemAtual_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        uorDestinoAtual_id: {
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
            // tipoMovimentacao: { include: [{ model: TipoMovimentacao, as: 'tipoMovimentacao' }] },
            uorInclusao: { include: [{ model: UOR, as: 'uorInclusao', attributes: ['id', 'nome', 'nomeReduzido'] }] },
            uorResponsavel: { include: [{ model: UOR, as: 'uorResponsavel', attributes: ['id', 'nome', 'nomeReduzido'] }] },
            uorAtual: { include: [{ model: UOR, as: 'uorAtual', attributes: ['id', 'nome', 'nomeReduzido'] }] },
            usuarioInclusao: { include: [{ model: Usuario, as: 'usuarioInclusao', attributes: ['id', 'nome'] }] },
            prioridade: { include: [{ model: Prioridade, as: 'prioridade' }] },
            movimentacoes: { include: [{ model: Movimentacao.scope('uorOrigem', 'uorDestino', 'usuarioInclusao'), as: 'movimentacoes' }] },
            responsaveis: { include: [{ model: Responsavel.scope('usuario'), as: 'responsaveis' }] },
        },
        schema: 'demanda',
        tableName: 'demanda',
    },
);

Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
// Model.belongsTo(TipoMovimentacao, { as: 'tipoMovimentacao', foreignKey: 'tipoMovimentacao_id' });
Model.belongsTo(UOR, { as: 'uorInclusao', foreignKey: 'uorOrigem_id' });
Model.belongsTo(UOR, { as: 'uorResponsavel', foreignKey: 'uorDestino_id' });
Model.belongsTo(UOR, { as: 'uorAtual', foreignKey: 'uorDestinoAtual_id' });
Model.belongsTo(Prioridade, { as: 'prioridade', foreignKey: 'prioridade_id' });
Model.hasMany(Movimentacao, { as: 'movimentacoes', foreignKey: 'demanda_id' });
Model.hasMany(Responsavel, { as: 'responsaveis', foreignKey: 'demanda_id' });

const ModelVersion = new Version(Model);
ModelVersion.sync();
export default Model;