'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('TagPainel', {
    id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: _sequelize4.default.STRING(255),
        allowNull: false
    },

    ativo: {
        type: _sequelize4.default.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    schema: 'paineis',
    tableName: 'tag'
});

Model.afterSync(() => Promise.all([Model.upsert({ id: 1, nome: 'Tag 1' }), Model.upsert({ id: 2, nome: 'Tag 2' })]));

exports.default = Model;