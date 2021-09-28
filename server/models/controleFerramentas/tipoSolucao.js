'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('TipoSolucao', {
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
  schema: 'controle_ferramentas_infor',
  tableName: 'tipo_solucao'
});

Model.afterSync(() => Promise.all([Model.upsert({ id: 1, nome: 'PowerBI' }), Model.upsert({ id: 2, nome: 'Relatório' }), Model.upsert({ id: 3, nome: 'Robô' }), Model.upsert({ id: 4, nome: 'SAS/Excel' }), Model.upsert({ id: 5, nome: 'SAS/PowerBI' }), Model.upsert({ id: 6, nome: 'SAS/SpotFire' }), Model.upsert({ id: 7, nome: 'SAS/Web' }), Model.upsert({ id: 8, nome: 'Web' })]));

exports.default = Model;