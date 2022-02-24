'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _sequelize = require('common/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _converter = require('common/sequelize/params/converter');

var _converter2 = _interopRequireDefault(_converter);

var _usuario = require('common/models/portal/usuario');

var _usuario2 = _interopRequireDefault(_usuario);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = router => {

    router.get('/rotina', async (req, res, next) => {
        const { query } = req;
        const { RotinaInfor } = _sequelize2.default.models;
        const params = (0, _converter2.default)(RotinaInfor, req);

        try {
            const response = await RotinaInfor.scope('usuarioInclusao', 'status', 'tipo', 'periodicidade').findAll(_extends({
                include: [{
                    model: _usuario2.default,
                    as: 'responsaveis',
                    where: query.responsavel_id ? { id: query.responsavel_id } : {}
                }]
            }, params));
            res.send(response);
        } catch (err) {
            next(err);
        }
    });

    router.get('/rotina/:id', async (req, res, next) => {
        const { RotinaInfor } = _sequelize2.default.models;
        const { id } = req.params;
        try {
            const response = await RotinaInfor.scope('paineis', 'tags', 'responsaveis', 'ferramentas', 'periodos', 'usuarioInclusao').findById(id, {
                order: _sequelize2.default.literal('"responsaveis->RotinaResponsavel"."tipo_id", "paineis"."nome"')
            });
            res.send(response);
        } catch (err) {
            next(err);
        }
    });

    router.post('/', async (req, res, next) => {
        const { RotinaInfor, RotinaPainel, RotinaTag, RotinaResponsavel, RotinaFerramenta, PeriodoRotina } = _sequelize2.default.models;
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
            Promise.all(data.responsaveis.map(responsavel => RotinaResponsavel.build(_extends({ rotina_id: response.id }, responsavel)).save()));
            //}
            if (data.ferramentas.length) {
                await RotinaFerramenta.destroy({ where: { rotina_id: response.id } });
                Promise.all(data.ferramentas.map(ferramenta_id => RotinaFerramenta.build({ rotina_id: response.id, ferramenta_id }).save()));
            }
            if (data.periodos && data.periodos.length) {
                await PeriodoRotina.destroy({ where: { rotina_id: response.id } });
                Promise.all(data.periodos.map(periodo => PeriodoRotina.build(_extends({ rotina_id: response.id }, periodo)).save()));
            }
            res.send(response);
        } catch (err) {
            next(err);
        }
    });
};