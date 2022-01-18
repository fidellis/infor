'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _painel = require('../painel/painel');

var _painel2 = _interopRequireDefault(_painel);

var _rotina = require('./rotina');

var _rotina2 = _interopRequireDefault(_rotina);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('RotinaPainel', {
    rotina_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    },

    painel_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    }
}, {
    scopes: {
        painel: {
            include: [{
                model: _painel2.default,
                as: 'painel'
            }]
        }
    },
    schema: 'rotina',
    tableName: 'rotina_painel'
});

// Model.belongsTo(Painel, { as: 'painel', foreignKey: 'painel_id' });

Model.beforeSync(() => {
    _rotina2.default.belongsToMany(_painel2.default, { through: Model, as: 'paineis', foreignKey: 'rotina_id', otherKey: 'painel_id' });
});

exports.default = Model;