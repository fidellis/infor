import sequelize from 'common/sequelize';
import paramsConverter from 'common/sequelize/params/converter';
import Demanda from '../models/demanda/demanda';
import Movimentacao from '../models/demanda/movimentacao';
import Descricao from '../models/demanda/descricao';
import Responsavel from '../models/demanda/responsavel';

async function addResponsaveis({ demanda, usuario, responsaveis }) {
    await Responsavel.destroy({ where: { demanda_id: demanda.id } });
    const response = await Responsavel.bulkCreate(responsaveis.map(responsavel => {
        return {
            demanda_id: demanda.id,
            usuario_id: responsavel,
            usuarioInclusao_id: usuario.id,
        };
    }), { returning: true });

    return response;
};

async function addMovimentacao({ demanda_id, usuario, uorDestino_id }) {
    const response = await Movimentacao.build({
        demanda_id,
        uorOrigem_id: usuario.uor_id,
        uorDestino_id,
        usuarioInclusao_id: usuario.id,
    }, { isNewRecord: true }).save();

    return response;
};

async function addDescricao({ movimentacao_id, status_id, usuario, descricao }) {
    const response = await Descricao.build({
        movimentacao_id,
        status_id,
        descricao,
        usuarioInclusao_id: usuario.id,
    }, { isNewRecord: true }).save();

    return response;
};



module.exports = (router) => {
    router.get('/', async (req, res, next) => {
        const params = paramsConverter(Demanda, req);
        try {
            const response = await Demanda.scope('status', 'statusMovimentacao', 'usuarioInclusao', 'uorInclusao', 'uorResponsavel', 'prioridade').findAll(params);
            //.scope({ method: ['tipo', params] })
            res.send(response);
        } catch (err) {
            next(err);
        }
    });

    router.get('/demanda/:id', async (req, res, next) => {
        const params = paramsConverter(Demanda, req);
        try {
            const response = await Demanda.scope('uorResponsavel', 'responsaveis').findById(req.params.id, params);
            res.send(response);
        } catch (err) {
            next(err);
        }
    });

    router.get('/descricao/:id', async (req, res, next) => {
        const demandaId = req.params.id;
        const params = paramsConverter(Demanda, req);
        try {
            const response = await Promise.all([
                Demanda.scope('uorResponsavel', 'responsaveis').findById(demandaId, params),
                Descricao.scope('status', 'usuarioInclusao').findAll({
                    include: [
                        {
                            model: Movimentacao.scope('status', 'uorOrigem', 'uorDestino', 'usuarioInclusao'),
                            as: 'movimentacao',
                            where: { demanda_id: demandaId },
                        }
                    ],
                    order: ['id'],
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
            data.uorInclusao_id = usuario.uor_id;
        } else {
            data.usuarioAlteracao_id = usuario.id;
            data.dataHoraAlteracao = new Date();
        };

        try {
            const demanda = await Demanda.build(data, { isNewRecord }).save();

            const responsaveis = data.responsaveis;
            if (responsaveis) addResponsaveis({ demanda, usuario, responsaveis });

            if (isNewRecord) {
                const movimentacao = await addMovimentacao({ demanda_id: demanda.id, uorDestino_id: demanda.uorResponsavel_id, usuario });
                const descricao = await addDescricao({ movimentacao_id: movimentacao.id, usuario, descricao: data.descricao });
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
            const descricao = await addDescricao({ movimentacao_id: data.movimentacao_id, status_id: data.status_id, usuario, descricao: data.descricao });
            res.send(descricao);
        } catch (err) {
            next(err);
        }
    });

    router.post('/movimentacao', async (req, res, next) => {
        const usuario = req.session.usuario;
        const data = req.body;

        try {
            const movimentacao = await addMovimentacao({ demanda_id: data.demanda_id, uorDestino_id: data.uorDestino_id, usuario });
            const descricao = await addDescricao({ movimentacao_id: movimentacao.id, status_id: 1, usuario, descricao: data.descricao });
            res.send(movimentacao);
        } catch (err) {
            next(err);
        }
    });


};
