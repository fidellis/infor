'use strict';

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _params = require('common/sequelize/params');

var _params2 = _interopRequireDefault(_params);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = router => {

    router.post('/', async (req, res, next) => {
        const { PainelInfor, PainelTag } = _sequelize2.default.models;
        //const modelParams = paramsConverter(PainelInfor);
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
            const record = await PainelInfor.find({ where: { id: { $notIn: [data.id || 0] }, nome: data.nome } });
            if (record) return res.status(400).send({ msg: `${record.nome} já cadastrado.` });

            const response = await PainelInfor.build(data, { isNewRecord }).save();
            if (data.tags.length) {
                await PainelTag.destroy({ where: { painel_id: response.id } });
                Promise.all(data.tags.map(tag_id => PainelTag.build({ painel_id: response.id, tag_id }).save()));
            }
            res.send(response);
        } catch (err) {
            next(err);
        }
    });
};