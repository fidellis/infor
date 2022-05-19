'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('TipoMovimentacaoDemanada', {
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
    },

    status_id: {
        type: _sequelize4.default.ARRAY(_sequelize4.default.INTEGER),
        allowNull: false
    }

}, {
    schema: 'demanda',
    tableName: 'tipo_movimentacao'
});

Model.afterSync(() => Promise.all([Model.upsert({ id: 1, nome: 'ENCAMINHADO', status_id: [1, 2, 4] }), Model.upsert({ id: 2, nome: 'ENCAMINHADO PARA HOMOLOGAÇÃO', status_id: [5, 6] }), Model.upsert({ id: 3, nome: 'DEVOLVIDO PARA COMPLEMENTO INFORMAÇÕES', status_id: [1, 2, 3, 4] }), Model.upsert({ id: 4, nome: 'DEVOLVIDO PARA AJUSTES', status_id: [1, 2, 4] }), Model.upsert({ id: 5, nome: 'ENCAMINHADO PARA RESPONSÁVEL', status_id: [7] })]));

exports.default = Model;