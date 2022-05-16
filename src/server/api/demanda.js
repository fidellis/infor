import sequelize from 'common/sequelize';
import paramsConverter from 'common/sequelize/params/converter';
import Demanda from '../models/demanda/demanda';
import Movimentacao from '../models/demanda/movimentacao';
import MovimentacaoStatus from '../models/demanda/movimentacaoStatus';
import Descricao from '../models/demanda/descricao';
import Responsavel from '../models/demanda/responsavel';

async function addResponsaveis({ demanda_id, responsaveis, usuario }) {
    await Responsavel.destroy({ where: { demanda_id } });
    const response = await Responsavel.bulkCreate(responsaveis.map(responsavel => {
        return {
            demanda_id,
            usuario_id: responsavel,
            usuarioInclusao_id: usuario.id,
        };
    }), { returning: true });

    return response;
};

async function addMovimentacao({ demanda_id, uorDestino_id, tipo_id, usuario }) {
    const response = await Movimentacao.build({
        demanda_id,
        uorDestino_id,
        uorOrigem_id: usuario.uor_id,
        tipo_id,
        usuarioInclusao_id: usuario.id,
    }, { isNewRecord: true }).save();

    return response;
};

async function addMovimentacaoStatus({ movimentacao_id, status_id, usuario }) {
    const response = await MovimentacaoStatus.build({
        movimentacao_id,
        status_id,
        usuarioInclusao_id: usuario.id,
    }, { isNewRecord: true }).save();

    return response;
};

async function addDescricao({ movimentacaoStatus_id, descricao, usuario }) {
    const response = await Descricao.build({
        movimentacaoStatus_id,
        descricao,
        usuarioInclusao_id: usuario.id,
    }, { isNewRecord: true }).save();

    return response;
};



module.exports = (router) => {
    router.get('/', async (req, res, next) => {
        const params = paramsConverter(Demanda, req);
        try {
            const response = await Demanda.scope('status', 'tipoMovimentacao', 'usuarioInclusao', 'uorInclusao', 'uorResponsavel', 'prioridade').findAll(params);
            //.scope({ method: ['tipo', params] })
            res.send(response);
        } catch (err) {
            next(err);
        }
    });

    router.get('/demanda/:id', async (req, res, next) => {
        const params = paramsConverter(Demanda, req);
        try {
            const response = await Demanda.scope('usuarioInclusao', 'uorResponsavel', 'responsaveis').findById(req.params.id, params);
            res.send(response);
        } catch (err) {
            next(err);
        }
    });

    router.get('/movimentacao/:demanadId', async (req, res, next) => {
        const demandaId = req.params.demanadId;
        const params = paramsConverter(Demanda, req);
        try {
            const response = await Promise.all([
                Demanda.scope('usuarioInclusao', 'uorResponsavel', 'uorInclusao', 'responsaveis').findById(demandaId, params),
                Movimentacao.scope('tipo', 'uorOrigem', 'uorDestino', 'usuarioInclusao', 'movimentacoesStatus').findAll({
                    where: { demanda_id: demandaId },
                    raw: true,
                    order: [
                        'id',
                        [{ model: MovimentacaoStatus, as: 'movimentacoesStatus' }, 'id'],
                        [{ model: MovimentacaoStatus, as: 'movimentacoesStatus' }, { model: Descricao, as: 'descricoes' }, 'id'],
                    ],
                }),
            ]);

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
            const demanda = await Demanda.build(data, { isNewRecord }).save();

            const responsaveis = data.responsaveis;
            if (responsaveis) addResponsaveis({ demanda_id: demanda.id, responsaveis, usuario });

            if (isNewRecord) {
                const movimentacao = await addMovimentacao({ demanda_id: demanda.id, uorDestino_id: demanda.uorDestino_id, usuario });
                const movimentacaoStatus = await addMovimentacaoStatus({ movimentacao_id: movimentacao.id, usuario });
                const descricao = await addDescricao({ movimentacaoStatus_id: movimentacaoStatus.id, descricao: data.descricao, usuario });
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
            const movimentacao = await addMovimentacao({ demanda_id: data.demanda_id, uorDestino_id: data.uorDestino_id, tipo_id: data.tipoMovimentacao_id, usuario });
            const movimentacaoStatus = await addMovimentacaoStatus({ movimentacao_id: movimentacao.id, status_id: data.status_id, usuario });
            if (data.descricao) await addDescricao({ movimentacaoStatus_id: movimentacaoStatus.id, descricao: data.descricao, usuario });
            res.send(movimentacao);
        } catch (err) {
            next(err);
        }
    });


};
