import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Version from 'common/sequelize/version';
import Usuario from 'common/models/portal/usuario';
import Tipo from './tipo';
import Status from './status';
import Periodicidade from './periodicidade';
import TipoPeriodicidade from './tipoPeriodicidade';
import RotinaPainel from './rotinaPainel';
import RotinaTag from './rotinaTag';
import RotinaResponsavel from './rotinaResponsavel';
import PeriodoRotina from './rotinaPeriodo';
import Painel from '../painel/painel';
import Tag from './tag';
import Ferramenta from './ferramenta';

const Model = sequelize.define(
    'RotinaInfor',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        nome: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
        },

        descricao: {
            type: Sequelize.TEXT,
            allowNull: true,
        },

        tipo_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        linkPop: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

        dataCriacao: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },

        status_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        periodicidade_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        tipoPeriodicidade_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        dia_semana: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        dia_mes_inicio: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        dia_mes_fim: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        mes_rotina: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        automatica: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        apresentacao_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        usuarioInclusao_id: {
            type: Sequelize.STRING(9),
            allowNull: false,
            associate: {
                model: 'Usuario',
            },
        },

        dataHoraInclusao: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },

        usuarioAlteracao_id: {
            type: Sequelize.STRING(9),
            allowNull: true,
            associate: {
                model: 'Usuario',
            },
        },
        dataHoraAlteracao: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    },
    {
        scopes: {
            paineis: { include: [{ model: Painel, as: 'paineis' }] },
            tags: { include: [{ model: Tag, as: 'tags' }] },
            periodos: { include: [{ model: PeriodoRotina, as: 'periodos' }] },
            ferramentas: { include: [{ model: Ferramenta, as: 'ferramentas' }] },
            responsaveis: () => ({ include: [{ model: Usuario, as: 'responsaveis', attributes: ['id', 'nome'] }] }),
            usuarioInclusao: { include: [{ model: Usuario, as: 'usuarioInclusao', attributes: ['id', 'nome'] }] },
        },
        schema: 'rotina',
        tableName: 'rotina',
    },
);

Model.belongsTo(Tipo, { as: 'tipo', foreignKey: 'tipo_id' });
Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(Periodicidade, { as: 'periodicidade', foreignKey: 'periodicidade_id' });
Model.belongsTo(TipoPeriodicidade, { as: 'tipoPeriodicidade', foreignKey: 'tipoPeriodicidade_id' });
// Model.hasMany(RotinaPainel, { as: 'rotinaPainel', foreignKey: 'rotina_id' });
Model.hasMany(RotinaResponsavel, { as: 'rotinaResponsavel', foreignKey: 'rotina_id' });
Model.hasMany(PeriodoRotina, { as: 'periodos', foreignKey: 'rotina_id' });
// Model.hasMany(RotinaTag, { as: 'rotinaTag', foreignKey: 'rotina_id' });

// const ModelVersion = new Version(Model);
// ModelVersion.sync();
Model.sync();
export default Model;