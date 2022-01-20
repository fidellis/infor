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

var _rotina = require('./rotina');

var _rotina2 = _interopRequireDefault(_rotina);

var _tipoResponsavel = require('./tipoResponsavel');

var _tipoResponsavel2 = _interopRequireDefault(_tipoResponsavel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('RotinaResponsavel', {
    rotina_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    },

    responsavel_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    },

    tipo_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true,
        defaultValue: 1
    }
}, {
    scopes: {
        responsavel: {
            include: [{
                model: _usuario2.default,
                as: 'responsavel'
            }]
        }
    },
    schema: 'rotina',
    tableName: 'rotina_responsavel'
});

Model.belongsTo(_usuario2.default, { as: 'responsavel', foreignKey: 'responsavel_id' });
Model.belongsTo(_tipoResponsavel2.default, { as: 'tipo', foreignKey: 'tipo_id' });

Model.beforeSync(() => {
    _rotina2.default.belongsToMany(_usuario2.default, { through: Model, as: 'responsaveis', foreignKey: 'rotina_id', otherKey: 'responsavel_id' });
});

exports.default = Model;