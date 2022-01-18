'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _version = require('common/sequelize/version');

var _version2 = _interopRequireDefault(_version);

var _usuario = require('common/models/portal/usuario');

var _usuario2 = _interopRequireDefault(_usuario);

var _tipo = require('./tipo');

var _tipo2 = _interopRequireDefault(_tipo);

var _status = require('../rotina/status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('PainelInfor', {
    id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: _sequelize4.default.STRING(255),
        allowNull: false
        // unique: true,
    },

    descricao: {
        type: _sequelize4.default.TEXT,
        allowNull: true
    },

    tipo_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: true
    },

    link: {
        type: _sequelize4.default.TEXT,
        allowNull: true,
        unique: true
    },

    status_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    dataCriacao: {
        type: _sequelize4.default.DATEONLY,
        allowNull: false,
        defaultValue: _sequelize4.default.NOW
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
        allowNull: false,
        defaultValue: _sequelize4.default.NOW
    },

    usuarioAlteracao_id: {
        type: _sequelize4.default.STRING(9),
        allowNull: true,
        associate: {
            model: 'Usuario'
        }
    },
    dataHoraAlteracao: {
        type: _sequelize4.default.DATE,
        allowNull: true
    }
}, {
    defaultScope: {
        include: [{
            model: _tipo2.default,
            as: 'tipo'
        }, {
            model: _status2.default,
            as: 'status'
        }]
    },
    schema: 'painel',
    tableName: 'painel'
});

Model.belongsTo(_tipo2.default, { as: 'tipo', foreignKey: 'tipo_id' });
Model.belongsTo(_status2.default, { as: 'status', foreignKey: 'status_id' });

Model.sync();
exports.default = Model;