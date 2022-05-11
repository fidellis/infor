import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Usuario from 'common/models/portal/usuario';

const Model = sequelize.define(
    'responsavelDemanda',
    {
        // id: {
        //     type: Sequelize.BIGINT,
        //     primaryKey: true,
        //     autoIncrement: true,
        // },

        demanda_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },

        usuario_id: {
            type: Sequelize.STRING(9),
            primaryKey: true,
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
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        scopes: {
            usuario: { include: [{ model: Usuario, as: 'usuario', attributes: ['id', 'nome'] }] },
        },
        schema: 'demanda',
        tableName: 'responsavel',
    },
);


Model.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuario_id' });

export default Model;