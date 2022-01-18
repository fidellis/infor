'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('PeriodicidadeRotina', {
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
    tableName: 'periodicidade'
});

Model.afterSync(() => Promise.all([Model.upsert({ id: 1, nome: 'Diária' }), Model.upsert({ id: 2, nome: 'Semanal' }), Model.upsert({ id: 3, nome: 'Mensal' }), Model.upsert({ id: 4, nome: 'Trimestral' }), Model.upsert({ id: 5, nome: 'Semestral' }), Model.upsert({ id: 6, nome: 'Anual' }), Model.upsert({ id: 7, nome: 'Eventual' })]));

exports.default = Model;