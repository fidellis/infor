import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Version from 'common/sequelize/version';
import Tipo from './tipo';
import Status from './status';
import Periodicidade from './periodicidade';
import TipoPeriodicidade from './tipoPeriodicidade';
import RotinaPainel from './rotinaPainel';
import RotinaTag from './rotinaTag';
import RotinaResponsavel from './rotinaResponsavel';

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

        dia_mes: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        dia_semana: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        automatica: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
        schema: 'rotina',
        tableName: 'rotina',
    },
);

Model.belongsTo(Tipo, { as: 'tipo', foreignKey: 'tipo_id' });
Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(Periodicidade, { as: 'periodicidade', foreignKey: 'periodicidade_id' });
Model.belongsTo(TipoPeriodicidade, { as: 'tiposPeriodicidade', foreignKey: 'tipoPeriodicidade_id' });
// Model.belongsTo(RotinaPainel, { as: 'rotinaPainel', foreignKey: 'rotina_id' });
// Model.belongsTo(RotinaResponsavel, { as: 'rotinaResponsavel', foreignKey: 'rotina_id' });
// Model.hasMany(RotinaTag, { as: 'rotinaTag', foreignKey: 'rotina_id' });

// const ModelVersion = new Version(Model);
// ModelVersion.sync();
Model.sync();
export default Model;