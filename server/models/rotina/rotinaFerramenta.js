'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _rotina = require('./rotina');

var _rotina2 = _interopRequireDefault(_rotina);

var _ferramenta = require('./ferramenta');

var _ferramenta2 = _interopRequireDefault(_ferramenta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('RotinaFerramenta', {
    rotina_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    },

    ferramenta_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    }
}, {
    scopes: {
        ferramenta: {
            include: [{
                model: _ferramenta2.default,
                as: 'ferramenta'
            }]
        }
    },
    schema: 'rotina',
    tableName: 'rotina_ferramenta'
});

// Model.belongsTo(Ferramenta, { as: 'ferramenta', foreignKey: 'ferramenta_id' });

Model.beforeSync(() => {
    _rotina2.default.belongsToMany(_ferramenta2.default, { through: Model, as: 'ferramentas', foreignKey: 'rotina_id', otherKey: 'ferramenta_id' });
});

exports.default = Model;