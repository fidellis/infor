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

var _tipo = require('./tipo');

var _tipo2 = _interopRequireDefault(_tipo);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

var _periodicidade = require('./periodicidade');

var _periodicidade2 = _interopRequireDefault(_periodicidade);

var _tipoPeriodicidade = require('./tipoPeriodicidade');

var _tipoPeriodicidade2 = _interopRequireDefault(_tipoPeriodicidade);

var _rotinaPainel = require('./rotinaPainel');

var _rotinaPainel2 = _interopRequireDefault(_rotinaPainel);

var _rotinaTag = require('./rotinaTag');

var _rotinaTag2 = _interopRequireDefault(_rotinaTag);

var _rotinaResponsavel = require('./rotinaResponsavel');

var _rotinaResponsavel2 = _interopRequireDefault(_rotinaResponsavel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('RotinaInfor', {
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
        allowNull: false
    },

    linkPop: {
        type: _sequelize4.default.TEXT,
        allowNull: false
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

    periodicidade_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false
    },

    tipoPeriodicidade_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false
    },

    dia_mes: {
        type: _sequelize4.default.INTEGER,
        allowNull: true
    },

    dia_semana: {
        type: _sequelize4.default.INTEGER,
        allowNull: true
    },

    automatica: {
        type: _sequelize4.default.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },

    apresentacao_id: {
        type: _sequelize4.default.INTEGER,
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
    schema: 'rotina',
    tableName: 'rotina'
});

Model.belongsTo(_tipo2.default, { as: 'tipo', foreignKey: 'tipo_id' });
Model.belongsTo(_status2.default, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(_periodicidade2.default, { as: 'periodicidade', foreignKey: 'periodicidade_id' });
Model.belongsTo(_tipoPeriodicidade2.default, { as: 'tiposPeriodicidade', foreignKey: 'tipoPeriodicidade_id' });
// Model.belongsTo(RotinaPainel, { as: 'rotinaPainel', foreignKey: 'rotina_id' });
// Model.belongsTo(RotinaResponsavel, { as: 'rotinaResponsavel', foreignKey: 'rotina_id' });
// Model.hasMany(RotinaTag, { as: 'rotinaTag', foreignKey: 'rotina_id' });

// const ModelVersion = new Version(Model);
// ModelVersion.sync();
Model.sync();
exports.default = Model;