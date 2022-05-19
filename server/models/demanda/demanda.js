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

var _uor = require('common/models/uor/uor');

var _uor2 = _interopRequireDefault(_uor);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

var _prioridade = require('./prioridade');

var _prioridade2 = _interopRequireDefault(_prioridade);

var _movimentacao = require('./movimentacao');

var _movimentacao2 = _interopRequireDefault(_movimentacao);

var _responsavel = require('./responsavel');

var _responsavel2 = _interopRequireDefault(_responsavel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Model = _sequelize2.default.define('Demanda', {
    id: {
        type: _sequelize4.default.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    titulo: {
        type: _sequelize4.default.STRING(255),
        allowNull: false
        // unique: true,
    },

    // tipoMovimentacao_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     defaultValue: 1,
    // },

    status_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    prioridade_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false,
        defaultValue: 2
    },

    uorOrigem_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false
    },

    uorDestino_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false
    },

    uorOrigemAtual_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false
    },

    uorDestinoAtual_id: {
        type: _sequelize4.default.INTEGER,
        allowNull: false
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
    scopes: {
        status: { include: [{ model: _status2.default, as: 'status' }] },
        // tipoMovimentacao: { include: [{ model: TipoMovimentacao, as: 'tipoMovimentacao' }] },
        uorInclusao: { include: [{ model: _uor2.default, as: 'uorInclusao', attributes: ['id', 'nome', 'nomeReduzido'] }] },
        uorResponsavel: { include: [{ model: _uor2.default, as: 'uorResponsavel', attributes: ['id', 'nome', 'nomeReduzido'] }] },
        uorAtual: { include: [{ model: _uor2.default, as: 'uorAtual', attributes: ['id', 'nome', 'nomeReduzido'] }] },
        usuarioInclusao: { include: [{ model: _usuario2.default, as: 'usuarioInclusao', attributes: ['id', 'nome'] }] },
        prioridade: { include: [{ model: _prioridade2.default, as: 'prioridade' }] },
        movimentacoes: { include: [{ model: _movimentacao2.default.scope('uorOrigem', 'uorDestino', 'usuarioInclusao'), as: 'movimentacoes' }] },
        responsaveis: { include: [{ model: _responsavel2.default.scope('usuario'), as: 'responsaveis' }] }
    },
    schema: 'demanda',
    tableName: 'demanda'
});
// import TipoMovimentacao from './tipoMovimentacao';


Model.belongsTo(_status2.default, { as: 'status', foreignKey: 'status_id' });
// Model.belongsTo(TipoMovimentacao, { as: 'tipoMovimentacao', foreignKey: 'tipoMovimentacao_id' });
Model.belongsTo(_uor2.default, { as: 'uorInclusao', foreignKey: 'uorOrigem_id' });
Model.belongsTo(_uor2.default, { as: 'uorResponsavel', foreignKey: 'uorDestino_id' });
Model.belongsTo(_uor2.default, { as: 'uorAtual', foreignKey: 'uorDestinoAtual_id' });
Model.belongsTo(_prioridade2.default, { as: 'prioridade', foreignKey: 'prioridade_id' });
Model.hasMany(_movimentacao2.default, { as: 'movimentacoes', foreignKey: 'demanda_id' });
Model.hasMany(_responsavel2.default, { as: 'responsaveis', foreignKey: 'demanda_id' });

const ModelVersion = new _version2.default(Model);
ModelVersion.sync();
exports.default = Model;