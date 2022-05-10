import sequelize from 'common/sequelize';
import paramsConverter from 'common/sequelize/params/converter';
import Demanda from '../models/demanda/demanda';
import Movimentacao from '../models/demanda/movimentacao';
import Descricao from '../models/demanda/descricao';

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
                Demanda.scope('uorResponsavel').findById(req.params.id, params),
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
        const usuarioUor = usuario.uor_id;
        const usuarioId = usuario.id;
        const data = req.body;
        const id = Number(data.id);
        const isNewRecord = !id;

        if (isNewRecord) {
            data.usuarioInclusao_id = usuarioId;
            data.uorInclusao_id = usuarioUor;
        } else {
            data.usuarioAlteracao_id = usuarioId;
            data.dataHoraAlteracao = new Date();
        };

        try {
            //   const record = await Demanda.find({ where: { id: { $not: id || null }, nome: data.nome }, attributes: ['nome'] });
            //   if (record) return res.status(400).send({ msg: `${record.nome} jรก cadastrado.` });

            const demanda = await Demanda.build(data, { isNewRecord }).save();

            if (isNewRecord) {
                const movimentacao = await Movimentacao.build({
                    demanda_id: demanda.id,
                    uorOrigem_id: usuarioUor,
                    uorDestino_id: data.uorResponsavel_id,
                    usuarioInclusao_id: usuarioId,
                }, { isNewRecord: true }).save();

                const descricao = await Descricao.build({
                    movimentacao_id: movimentacao.id,
                    descricao: data.descricao,
                    usuarioInclusao_id: usuarioId,
                }, { isNewRecord: true }).save();
            }


            res.send(demanda);
        } catch (err) {
            next(err);
        }
    });

};
