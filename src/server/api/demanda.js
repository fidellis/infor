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

async function addMovimentacao({ demanda, usuario }) {
    const response = await Movimentacao.build({
        demanda_id: demanda.id,
        uorOrigem_id: usuario.uor_id,
        uorDestino_id: demanda.uorResponsavel_id,
        usuarioInclusao_id: usuario.id,
    }, { isNewRecord: true }).save();

    return response;
};

async function addDescricao({ movimentacao_id, usuario, descricao }) {
    const response = await Descricao.build({
        movimentacao_id,
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
            const response = await Promise.all([
                Demanda.scope('uorResponsavel', 'responsaveis').findById(req.params.id, params),
                Descricao.scope('status', 'usuarioInclusao').findAll({
                    include: [
                        {
                            model: Movimentacao.scope('status', 'uorOrigem', 'uorDestino', 'usuarioInclusao'),
                            as: 'movimentacao',
                            where: { demanda_id: req.params.id },
                        }
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
            data.uorInclusao_id = usuario.uor_id;
        } else {
            data.usuarioAlteracao_id = usuario.id;
            data.dataHoraAlteracao = new Date();
        };

        try {
            //   const record = await Demanda.find({ where: { id: { $not: id || null }, nome: data.nome }, attributes: ['nome'] });
            //   if (record) return res.status(400).send({ msg: `${record.nome} jรก cadastrado.` });

            const demanda = await Demanda.build(data, { isNewRecord }).save();

            const responsaveis = data.responsaveis;
            if (responsaveis) addResponsaveis({ demanda, usuario, responsaveis });

            if (isNewRecord) {
                const movimentacao = await addMovimentacao({ demanda, usuario });
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
            const descricao = await addDescricao({ movimentacao_id: data.movimentacao_id, usuario, descricao: data.descricao });
            res.send(descricao);
        } catch (err) {
            next(err);
        }
    });

};
