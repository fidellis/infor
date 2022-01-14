import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Version from 'common/sequelize/version';
import Usuario from 'common/models/portal/usuario';
import Tipo from './tipo';
import Status from './status';
import PainelTag from './painelTag';

const Model = sequelize.define(
    'PainelInfor',
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
            allowNull: true,
        },

        link: {
            type: Sequelize.TEXT,
            allowNull: true,
        },

        linkPop: {
            type: Sequelize.TEXT,
            allowNull: true,
        },

        responsavel_id: {
            type: Sequelize.STRING(9),
            allowNull: false,
        },

        responsavel2_id: {
            type: Sequelize.STRING(9),
            allowNull: true,
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
            relatorio: {
                attributes: [
                    [sequelize.fn('count', sequelize.col('status_id')), 'quantidade'],
                ],

                include: [
                    {
                        model: Status,
                        as: 'status',
                        attributes: ['id', 'nome'],
                    },
                ],
                group: ['status_id', sequelize.literal('status.id'), sequelize.literal('status.nome')],
            },
        },
        schema: 'paineis',
        tableName: 'painel',
    },
);

Model.belongsTo(Tipo, { as: 'tipo', foreignKey: 'tipo_id' });
Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(Usuario, { as: 'responsavel', foreignKey: 'responsavel_id' });
Model.belongsTo(Usuario, { as: 'responsavel2', foreignKey: 'responsavel2_id' });
// Model.hasMany(PainelTag, { as: 'painelTag', foreignKey: 'painel_id' });

const ModelVersion = new Version(Model);
ModelVersion.sync();

export default Model;