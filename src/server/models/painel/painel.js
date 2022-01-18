import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Version from 'common/sequelize/version';
import Usuario from 'common/models/portal/usuario';
import Tipo from './tipo';
import Status from '../rotina/status';

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
            // unique: true,
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
            unique: true,
        },

        status_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        dataCriacao: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW,
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
        defaultScope: {
            include: [
                {
                    model: Tipo,
                    as: 'tipo',
                },
                {
                    model: Status,
                    as: 'status',
                }
            ]
        },
        schema: 'painel',
        tableName: 'painel',
    },
);

Model.belongsTo(Tipo, { as: 'tipo', foreignKey: 'tipo_id' });
Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });

Model.sync();
export default Model;