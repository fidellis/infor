'use strict';

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = router => {

    router.post('/', async (req, res, next) => {
        const { PainelInfor } = _sequelize2.default.models;
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
            let record = null;
            // record = await PainelInfor.find({ where: { id: { $notIn: [data.id || 0] }, nome: data.nome } });
            // if (record) return res.status(400).send({ msg: `${record.nome} já cadastrado.` });
            record = await PainelInfor.find({ where: { id: { $notIn: [data.id || 0] }, link: data.link } });
            if (record) return res.status(400).send({ msg: `Link já cadastrado no painel ${record.nome} (${record.id})` });

            const response = await PainelInfor.build(data, { isNewRecord }).save();
            res.send(response);
        } catch (err) {
            next(err);
        }
    });
};