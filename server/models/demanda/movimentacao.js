'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _usuario = require('common/models/portal/usuario');

var _usuario2 = _interopRequireDefault(_usuario);

var _uor = require('common/models/uor/uor');

var _uor2 = _interopRequireDefault(_uor);

var _movimentacaoStatus = require('./movimentacaoStatus');

var _movimentacaoStatus2 = _interopRequireDefault(_movimentacaoStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('MovimentacaoDemanda', {
    id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    demanda_id: {
        type: _sequelize4.default.BIGINT,
        allowNull: false
    },

    uorOrigem_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false
    },

    uorDestino_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false
    },

    // tipo_id: {
    //     type: Sequelize.BIGINT,
    //     allowNull: true,
    //     defaultValue: 1,
    // },

    usuarioInclusao_id: {
        type: _sequelize4.default.STRING(9),
        allowNull: false,
        associate: {
            model: 'Usuario'
        }
    },

    dataHoraInclusao: {
        type: _sequelize4.default.DATE,
        allowNull: false,
        defaultValue: _sequelize4.default.NOW
    }
}, {
    scopes: {
        // tipo: { include: [{ model: Tipo, as: 'tipo' }] },
        uorOrigem: { include: [{ model: _uor2.default, as: 'uorOrigem', attributes: ['id', 'nome', 'nomeReduzido'] }] },
        uorDestino: { include: [{ model: _uor2.default, as: 'uorDestino', attributes: ['id', 'nome', 'nomeReduzido'] }] },
        usuarioInclusao: { include: [{ model: _usuario2.default, as: 'usuarioInclusao', attributes: ['id', 'nome'] }] },
        movimentacoesStatus: { include: [{ model: _movimentacaoStatus2.default.scope('status', 'usuarioInclusao', 'descricoes'), as: 'movimentacoesStatus' }] }
    },
    // indexes: [{
    //     unique: true,
    //     fields: ['demanda_id', 'uor_origem_id', 'uor_destino_id', 'data_hora_inclusao'],
    // }],
    schema: 'demanda',
    tableName: 'movimentacao'
});
// import Tipo from './tipoMovimentacao';


Model.hook("afterSave", async (movimentacao, { transaction }) => {
    const { Demanda } = _sequelize2.default.models;
    await Demanda.update({ tipoMovimentacao_id: movimentacao.tipo_id, uorOrigemAtual_id: movimentacao.uorOrigem_id, uorDestinoAtual_id: movimentacao.uorDestino_id }, { where: { id: movimentacao.demanda_id } });
});

// Model.belongsTo(Tipo, { as: 'tipo', foreignKey: 'tipo_id' });
Model.belongsTo(_uor2.default, { as: 'uorOrigem', foreignKey: 'uorOrigem_id' });
Model.belongsTo(_uor2.default, { as: 'uorDestino', foreignKey: 'uorDestino_id' });
Model.hasMany(_movimentacaoStatus2.default, { as: 'movimentacoesStatus', foreignKey: 'movimentacao_id' });
// MovimentacaoStatus.belongsTo(Model, { as: 'movimentacao', foreignKey: 'movimentacao_id' });

exports.default = Model;