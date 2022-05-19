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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('DescricaoDemanda', {
    id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    movimentacaoStatus_id: {
        type: _sequelize4.default.BIGINT,
        allowNull: false
    },

    descricao: {
        type: _sequelize4.default.TEXT,
        allowNull: false
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
        usuarioInclusao: { include: [{ model: _usuario2.default, as: 'usuarioInclusao', attributes: ['id', 'nome'] }] }
    },
    schema: 'demanda',
    tableName: 'descricao'
});

// Model.hook("afterSave", async (descricao, { transaction }) => {
//     const { Demanda, MovimentacaoDemanda } = sequelize.models;
//     const movimentacao = await MovimentacaoDemanda.find({ where: { id: descricao.movimentacao_id } });
//     await Demanda.update({ status_id: descricao.status_id }, { where: { id: movimentacao.demanda_id } });
// });

exports.default = Model;