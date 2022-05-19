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

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

var _descricao = require('./descricao');

var _descricao2 = _interopRequireDefault(_descricao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('MovimentacaoStatusDemanda', {
    id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    movimentacao_id: {
        type: _sequelize4.default.BIGINT,
        allowNull: false
    },

    status_id: {
        type: _sequelize4.default.BIGINT,
        allowNull: false,
        defaultValue: 1
    },

    usuarioInclusao_id: {
        type: _sequelize4.default.STRING(9),
        allowNull: false,
        associate: {
            model: 'Usuario'
        }
    },

    dataHoraInclusao: {
        type: _sequelize4.default.DATE,
        primaryKey: true,
        allowNull: false,
        defaultValue: _sequelize4.default.NOW
    }
}, {
    scopes: {
        status: { include: [{ model: _status2.default, as: 'status' }] },
        usuarioInclusao: { include: [{ model: _usuario2.default, as: 'usuarioInclusao', attributes: ['id', 'nome'] }] },
        descricoes: { include: [{ model: _descricao2.default.scope('usuarioInclusao'), as: 'descricoes' }] }
    },
    schema: 'demanda',
    tableName: 'movimentacao_status'
});

Model.belongsTo(_status2.default, { as: 'status', foreignKey: 'status_id' });
Model.hasMany(_descricao2.default, { as: 'descricoes', foreignKey: 'movimentacaoStatus_id' });
// Descricao.belongsTo(Model, { as: 'movimentacaoStatus', foreignKey: 'movimentacaoStatus_id' });

Model.hook("afterSave", async (movimentacaoStatus, { transaction }) => {
    const { Demanda, MovimentacaoDemanda } = _sequelize2.default.models;
    const movimentacao = await MovimentacaoDemanda.find({ where: { id: movimentacaoStatus.movimentacao_id } });
    await Demanda.update({ status_id: movimentacaoStatus.status_id }, { where: { id: movimentacao.demanda_id } });
});

exports.default = Model;