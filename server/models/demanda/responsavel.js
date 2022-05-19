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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('ResponsavelDemanda', {
    // id: {
    //     type: Sequelize.BIGINT,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },

    demanda_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    },

    usuario_id: {
        type: _sequelize4.default.STRING(9),
        primaryKey: true
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
        usuario: { include: [{ model: _usuario2.default, as: 'usuario', attributes: ['id', 'nome'] }] }
    },
    schema: 'demanda',
    tableName: 'responsavel'
});

Model.belongsTo(_usuario2.default, { as: 'usuario', foreignKey: 'usuario_id' });

exports.default = Model;