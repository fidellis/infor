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

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

var _painelTag = require('./painelTag');

var _painelTag2 = _interopRequireDefault(_painelTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('PainelInfor', {
    id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: _sequelize4.default.STRING(255),
        allowNull: false,
        unique: true
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
        allowNull: true
    },

    linkPop: {
        type: _sequelize4.default.TEXT,
        allowNull: true
    },

    responsavel_id: {
        type: _sequelize4.default.STRING(9),
        allowNull: false
    },

    responsavel2_id: {
        type: _sequelize4.default.STRING(9),
        allowNull: true
    },

    dataCriacao: {
        type: _sequelize4.default.DATEONLY,
        allowNull: false,
        defaultValue: _sequelize4.default.NOW
    },

    status_id: {
        type: _sequelize4.default.INTEGER,
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
    scopes: {
        relatorio: {
            attributes: [[_sequelize2.default.fn('count', _sequelize2.default.col('status_id')), 'quantidade']],

            include: [{
                model: _status2.default,
                as: 'status',
                attributes: ['id', 'nome']
            }],
            group: ['status_id', _sequelize2.default.literal('status.id'), _sequelize2.default.literal('status.nome')]
        }
    },
    schema: 'paineis',
    tableName: 'painel'
});

Model.belongsTo(_tipo2.default, { as: 'tipo', foreignKey: 'tipo_id' });
Model.belongsTo(_status2.default, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(_usuario2.default, { as: 'responsavel', foreignKey: 'responsavel_id' });
Model.belongsTo(_usuario2.default, { as: 'responsavel2', foreignKey: 'responsavel2_id' });
// Model.hasMany(PainelTag, { as: 'painelTag', foreignKey: 'painel_id' });

const ModelVersion = new _version2.default(Model);
ModelVersion.sync();

exports.default = Model;