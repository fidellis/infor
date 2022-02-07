import sequelize from 'common/sequelize';
import paramsConverter from 'common/sequelize/params';
module.exports = (router) => {

    router.post('/', async (req, res, next) => {
        const { RotinaInfor, RotinaPainel, RotinaTag, RotinaResponsavel, RotinaFerramenta, PeriodoRotina } = sequelize.models;
        //const modelParams = paramsConverter(RotinaInfor);
        //const params = modelParams(req);
        const usuario = req.session.usuario;
        const data = req.body;
        const isNewRecord = !data.id;

        if (isNewRecord) {
            data.usuarioInclusao_id = usuario.id;
        } else {
            data.usuarioAlteracao_id = usuario.id;
            data.dataHoraAlteracao = new Date();
        };

        try {
            const record = await RotinaInfor.find({ where: { id: { $notIn: [data.id || 0] }, nome: data.nome } });
            if (record) return res.status(400).send({ msg: `${record.nome} já cadastrado.` });

            const response = await RotinaInfor.build(data, { isNewRecord }).save();

            //if (data.paineis.length) {
            await RotinaPainel.destroy({ where: { rotina_id: response.id } });
            Promise.all(data.paineis.map(painel_id => RotinaPainel.build({ rotina_id: response.id, painel_id }).save()));
            //}
            if (data.tags.length) {
                await RotinaTag.destroy({ where: { rotina_id: response.id } });
                Promise.all(data.tags.map(tag_id => RotinaTag.build({ rotina_id: response.id, tag_id }).save()));
            }
            //if (data.responsaveis.length) {
            await RotinaResponsavel.destroy({ where: { rotina_id: response.id } });
            Promise.all(data.responsaveis.map(responsavel => RotinaResponsavel.build({ rotina_id: response.id, ...responsavel }).save()));
            //}
            if (data.ferramentas.length) {
                await RotinaFerramenta.destroy({ where: { rotina_id: response.id } });
                Promise.all(data.ferramentas.map(ferramenta_id => RotinaFerramenta.build({ rotina_id: response.id, ferramenta_id }).save()));
            }
            if (data.periodos.length) {
                await PeriodoRotina.destroy({ where: { rotina_id: response.id } });
                Promise.all(data.periodos.map(periodo => PeriodoRotina.build({ rotina_id: response.id, ...periodo }).save()));
            }
            res.send(response);
        } catch (err) {
            next(err);
        }
    });

};
