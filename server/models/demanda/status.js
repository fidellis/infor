'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('StatusDemanda', {
    id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: _sequelize4.default.STRING(255),
        allowNull: false
    },

    motivoMovimentacao: {
        type: _sequelize4.default.STRING(255),
        allowNull: true
    },

    ativo: {
        type: _sequelize4.default.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

    // statusPermitidos: {
    //     type: Sequelize.ARRAY(Sequelize.INTEGER),
    //     allowNull: true,
    // },
}, {
    schema: 'demanda',
    tableName: 'status'
});

Model.afterSync(() => Promise.all([Model.upsert({ id: 1, nome: 'AGUARDANDO ATENDIMENTO' }), Model.upsert({ id: 2, nome: 'EM ANÁLISE' }), Model.upsert({ id: 3, nome: 'EM EXECUÇÃO' }), Model.upsert({ id: 4, nome: 'CANCELADO' }), Model.upsert({ id: 5, nome: 'EM HOMOLOGAÇÃO' }), Model.upsert({ id: 6, nome: 'HOMOLOGADO' }), Model.upsert({ id: 7, nome: 'FINALIZADO' }), Model.upsert({ id: 8, nome: 'REABERTO' }), Model.upsert({ id: 9, nome: 'DEVOLVIDO PARA COMPLEMENTO INFORMAÇÕES', motivoMovimentacao: 'COMPLEMENTO DE INFORMAÇÕES' }), Model.upsert({ id: 10, nome: 'DEVOLVIDO PARA AJUSTES', motivoMovimentacao: 'AJUSTES' })]));

exports.default = Model;