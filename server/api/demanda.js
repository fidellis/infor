'use strict';

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _converter = require('common/sequelize/params/converter');

var _converter2 = _interopRequireDefault(_converter);

var _demanda = require('../models/demanda/demanda');

var _demanda2 = _interopRequireDefault(_demanda);

var _movimentacao = require('../models/demanda/movimentacao');

var _movimentacao2 = _interopRequireDefault(_movimentacao);

var _movimentacaoStatus = require('../models/demanda/movimentacaoStatus');

var _movimentacaoStatus2 = _interopRequireDefault(_movimentacaoStatus);

var _descricao = require('../models/demanda/descricao');

var _descricao2 = _interopRequireDefault(_descricao);

var _responsavel = require('../models/demanda/responsavel');

var _responsavel2 = _interopRequireDefault(_responsavel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addResponsaveis({ demanda_id, responsaveis, usuario }) {
    await _responsavel2.default.destroy({ where: { demanda_id } });
    const response = await _responsavel2.default.bulkCreate(responsaveis.map(responsavel => {
        return {
            demanda_id,
            usuario_id: responsavel,
            usuarioInclusao_id: usuario.id
        };
    }), { returning: true });

    return response;
};

async function addMovimentacao({ demanda_id, uorDestino_id, tipo_id, usuario }) {
    const response = await _movimentacao2.default.build({
        demanda_id,
        uorDestino_id,
        uorOrigem_id: usuario.uor_id,
        // tipo_id,
        usuarioInclusao_id: usuario.id
    }, { isNewRecord: true }).save();

    return response;
};

async function addMovimentacaoStatus({ movimentacao_id, status_id, usuario }) {
    const response = await _movimentacaoStatus2.default.build({
        movimentacao_id,
        status_id,
        usuarioInclusao_id: usuario.id
    }, { isNewRecord: true }).save();

    return response;
};

async function addDescricao({ movimentacaoStatus_id, descricao, usuario }) {
    const response = await _descricao2.default.build({
        movimentacaoStatus_id,
        descricao,
        usuarioInclusao_id: usuario.id
    }, { isNewRecord: true }).save();

    return response;
};

module.exports = router => {
    router.get('/', async (req, res, next) => {
        const params = (0, _converter2.default)(_demanda2.default, req);
        try {
            const response = await _demanda2.default.scope('status', 'usuarioInclusao', 'uorInclusao', 'uorResponsavel', 'prioridade').findAll(params);
            //.scope({ method: ['tipo', params] })
            res.send(response);
        } catch (err) {
            next(err);
        }
    });

    router.get('/demanda/:id', async (req, res, next) => {
        const params = (0, _converter2.default)(_demanda2.default, req);
        try {
            const response = await _demanda2.default.scope('usuarioInclusao', 'uorResponsavel', 'responsaveis').findById(req.params.id, params);
            res.send(response);
        } catch (err) {
            next(err);
        }
    });

    router.get('/movimentacao/:demanadId', async (req, res, next) => {
        const demandaId = req.params.demanadId;
        const params = (0, _converter2.default)(_demanda2.default, req);
        try {
            const response = await Promise.all([_demanda2.default.scope('usuarioInclusao', 'uorResponsavel', 'uorInclusao', 'responsaveis').findById(demandaId, params), _movimentacao2.default.scope('uorOrigem', 'uorDestino', 'usuarioInclusao', 'movimentacoesStatus').findAll({
                where: { demanda_id: demandaId },
                raw: true,
                order: ['id', [{ model: _movimentacaoStatus2.default, as: 'movimentacoesStatus' }, 'id'], [{ model: _movimentacaoStatus2.default, as: 'movimentacoesStatus' }, { model: _descricao2.default, as: 'descricoes' }, 'id']]
            })]);

            res.send(response);
        } catch (err) {
            next(err);
        }
    });

    router.post('/', async (req, res, next) => {
        const usuario = req.session.usuario;
        const data = req.body;
        const id = Number(data.id);
        const isNewRecord = !id;

        if (isNewRecord) {
            data.usuarioInclusao_id = usuario.id;
            data.uorOrigem_id = usuario.uor_id;
            data.uorOrigemAtual_id = usuario.uor_id;
            data.uorDestinoAtual_id = data.uorDestino_id;
        } else {
            data.usuarioAlteracao_id = usuario.id;
            data.dataHoraAlteracao = new Date();
        };

        try {
            const demanda = await _demanda2.default.build(data, { isNewRecord }).save();

            const responsaveis = data.responsaveis;
            if (responsaveis) addResponsaveis({ demanda_id: demanda.id, responsaveis, usuario });

            if (isNewRecord) {
                const movimentacao = await addMovimentacao({ demanda_id: demanda.id, uorDestino_id: demanda.uorDestino_id, usuario });
                const movimentacaoStatus = await addMovimentacaoStatus({ movimentacao_id: movimentacao.id, usuario });
                await addDescricao({ movimentacaoStatus_id: movimentacaoStatus.id, descricao: data.descricao, usuario });
            }

            res.send(demanda);
        } catch (err) {
            next(err);
        }
    });

    router.post('/descricao', async (req, res, next) => {
        const usuario = req.session.usuario;
        const data = req.body;

        try {
            const descricao = await addDescricao({ movimentacaoStatus_id: data.movimentacaoStatus_id, descricao: data.descricao, usuario });
            res.send(descricao);
        } catch (err) {
            next(err);
        }
    });

    router.post('/movimentacaoStatus', async (req, res, next) => {
        const usuario = req.session.usuario;
        const data = req.body;

        try {
            const movimentacaoStatus = await addMovimentacaoStatus({ movimentacao_id: data.movimentacao_id, status_id: data.status_id, usuario });
            if (data.descricao) await addDescricao({ movimentacaoStatus_id: movimentacaoStatus.id, descricao: data.descricao, usuario });
            res.send(movimentacaoStatus);
        } catch (err) {
            next(err);
        }
    });

    router.post('/movimentacao', async (req, res, next) => {
        const usuario = req.session.usuario;
        const data = req.body;

        try {
            const movimentacao = await addMovimentacao({ demanda_id: data.demanda_id, uorDestino_id: data.uorDestino_id, usuario });
            const movimentacaoStatus = await addMovimentacaoStatus({ movimentacao_id: movimentacao.id, status_id: data.status_id, usuario });
            if (data.descricao) await addDescricao({ movimentacaoStatus_id: movimentacaoStatus.id, descricao: data.descricao, usuario });
            res.send(movimentacao);
        } catch (err) {
            next(err);
        }
    });
};