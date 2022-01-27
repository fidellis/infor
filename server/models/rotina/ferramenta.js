'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('FerramentaRotina', {
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
    schema: 'rotina',
    tableName: 'ferramenta'
});

// Model.afterSync(() => Promise.all([
//     Model.upsert({ id: 1, nome: 'SAS' }),
//     Model.upsert({ id: 2, nome: 'Access' }),
//     Model.upsert({ id: 3, nome: 'Excel' }),
//     Model.upsert({ id: 4, nome: 'Mysql' }),
//     Model.upsert({ id: 5, nome: 'Postgres' }),
//     Model.upsert({ id: 6, nome: 'BBM' }),
//     Model.upsert({ id: 7, nome: 'Power Point' }),
//     Model.upsert({ id: 8, nome: 'DB2SDCOM' }),
//     Model.upsert({ id: 9, nome: 'DB2SEMI1' }),
//     Model.upsert({ id: 10, nome: 'Arquivo TXT' }),
//     Model.upsert({ id: 11, nome: 'Robô' }),
// ]));

exports.default = Model;