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

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('RotinaTag', {
    rotina_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    },

    tag_id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true
    }
}, {
    scopes: {
        tag: {
            include: [{
                model: _tag2.default,
                as: 'tag'
            }]
        }
    },
    schema: 'rotina',
    tableName: 'rotina_tag'
});

// Model.belongsTo(Tag, { as: 'tag', foreignKey: 'tag_id' });

Model.beforeSync(() => {
    _rotina2.default.belongsToMany(_tag2.default, { through: Model, as: 'tags', foreignKey: 'rotina_id', otherKey: 'tag_id' });
});

exports.default = Model;