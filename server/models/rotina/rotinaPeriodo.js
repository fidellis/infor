'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('PeriodoRotina', {
    rotina_id: {
        type: _sequelize4.default.BIGINT,
        allowNull: false
    },

    mes: {
        type: _sequelize4.default.INTEGER,
        primaryKey: true,
        allowNull: false
    }

    // diaInicio: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    // },

    // diaFim: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    // },
}, {
    schema: 'rotina',
    tableName: 'rotina_periodo'
});

exports.default = Model;