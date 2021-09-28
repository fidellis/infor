'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('common/sequelize/sequelize');

var _sequelize4 = _interopRequireDefault(_sequelize3);

var _version = require('common/sequelize/version');

var _version2 = _interopRequireDefault(_version);

var _usuario = require('common/models/portal/usuario');

var _usuario2 = _interopRequireDefault(_usuario);

var _tipoSolucao = require('./tipoSolucao');

var _tipoSolucao2 = _interopRequireDefault(_tipoSolucao);

var _tipoProvidencia = require('./tipoProvidencia');

var _tipoProvidencia2 = _interopRequireDefault(_tipoProvidencia);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('FerramentaInfor', {
  id: {
    type: _sequelize4.default.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  nome: {
    type: _sequelize4.default.STRING(255),
    allowNull: false
  },

  demandante_id: {
    type: _sequelize4.default.STRING(9),
    allowNull: false
  },

  responsavel_id: {
    type: _sequelize4.default.STRING(9),
    allowNull: false
  },

  tipo_solucao_id: {
    type: _sequelize4.default.INTEGER,
    allowNull: true
  },

  providencia: {
    type: _sequelize4.default.TEXT,
    allowNull: true
  },

  tipo_providencia_id: {
    type: _sequelize4.default.INTEGER,
    allowNull: true
  },

  link: {
    type: _sequelize4.default.TEXT,
    allowNull: true
  },

  status_id: {
    type: _sequelize4.default.INTEGER,
    allowNull: false,
    defaultValue: 1
  },

  usuarioInclusao_id: {
    type: _sequelize4.default.STRING(9),
    allowNull: false,
    associate: {
      model: 'Usuario'
    }
  },

  dataHoraInclusao: {
    type: _sequelize4.default.DATE,
    allowNull: false,
    defaultValue: _sequelize4.default.NOW
  },

  usuarioAlteracao_id: {
    type: _sequelize4.default.STRING(9),
    allowNull: true,
    associate: {
      model: 'Usuario'
    }
  },
  dataHoraAlteracao: {
    type: _sequelize4.default.DATE,
    allowNull: true
  }
}, {
  schema: 'controle_ferramentas_infor',
  tableName: 'ferramenta'
});

Model.belongsTo(_tipoSolucao2.default, { as: 'tipoSolucao', foreignKey: 'tipo_solucao_id' });
Model.belongsTo(_tipoProvidencia2.default, { as: 'tipoProvidencia', foreignKey: 'tipo_providencia_id' });
Model.belongsTo(_status2.default, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(_usuario2.default, { as: 'demandante', foreignKey: 'demandante_id' });
Model.belongsTo(_usuario2.default, { as: 'responsavel', foreignKey: 'responsavel_id' });

const ModelVersion = new _version2.default(Model);
ModelVersion.sync();

exports.default = Model;