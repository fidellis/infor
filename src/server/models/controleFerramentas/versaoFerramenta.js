import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Version from 'common/sequelize/version';
import Usuario from 'common/models/portal/usuario';
import TipoSolucao from './tipoSolucao';
import TipoProvidencia from './tipoProvidencia';
import Status from './status';

const Model = sequelize.define(
    'VersaoFerramentaInfor',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        nome: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },

        demandante_id: {
            type: Sequelize.STRING(9),
            allowNull: false,
        },

        responsavel_id: {
            type: Sequelize.STRING(9),
            allowNull: false,
        },

        tipo_solucao_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        providencia: {
            type: Sequelize.TEXT,
            allowNull: true,
        },

        tipo_providencia_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        link: {
            type: Sequelize.TEXT,
            allowNull: true,
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
            status: {
                attributes: [
                    'id',
                    'dataHoraInclusao',
                    'dataHoraAlteracao',
                ],
                include: [
                    {
                        model: Status,
                        as: 'status',
                        attributes: ['id', 'nome'],
                    },
                ],
                order: ['id', 'dataHoraInclusao', 'dataHoraAlteracao'],
            },
        },
        schema: 'controle_ferramentas_infor',
        tableName: 'versao_ferramenta',
    },
);

Model.belongsTo(TipoSolucao, { as: 'tipoSolucao', foreignKey: 'tipo_solucao_id' });
Model.belongsTo(TipoProvidencia, { as: 'tipoProvidencia', foreignKey: 'tipo_providencia_id' });
Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(Usuario, { as: 'demandante', foreignKey: 'demandante_id' });
Model.belongsTo(Usuario, { as: 'responsavel', foreignKey: 'responsavel_id' });

export default Model;