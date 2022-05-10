import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';
import Version from 'common/sequelize/version';
import Usuario from 'common/models/portal/usuario';
import UOR from 'common/models/uor/uor';
import Status from './status';
import StatusMovimentacao from './statusMovimentacao';
import Prioridade from './prioridade';
import Movimentacao from './movimentacao';


const Model = sequelize.define(
    'demanda',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        titulo: {
            type: Sequelize.STRING(255),
            allowNull: false,
            // unique: true,
        },

        statusMovimentacao_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        status_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        prioridade_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2,
        },

        uorInclusao_id: {
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

        uorResponsavel_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
            status: { include: [{ model: Status, as: 'status' }] },
            statusMovimentacao: { include: [{ model: StatusMovimentacao, as: 'statusMovimentacao' }] },
            uorInclusao: { include: [{ model: UOR, as: 'uorInclusao' }] },
            uorResponsavel: { include: [{ model: UOR, as: 'uorResponsavel' }] },
            usuarioInclusao: { include: [{ model: Usuario, as: 'usuarioInclusao' }] },
            prioridade: { include: [{ model: Prioridade, as: 'prioridade' }] },
            movimentacoes: { include: [{ model: Movimentacao.scope('status'), as: 'movimentacoes' }] },
        },
        schema: 'demanda',
        tableName: 'demanda',
    },
);

Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
Model.belongsTo(StatusMovimentacao, { as: 'statusMovimentacao', foreignKey: 'statusMovimentacao_id' });
Model.belongsTo(UOR, { as: 'uorInclusao', foreignKey: 'uorInclusao_id' });
Model.belongsTo(UOR, { as: 'uorResponsavel', foreignKey: 'uorResponsavel_id' });
Model.belongsTo(Prioridade, { as: 'prioridade', foreignKey: 'prioridade_id' });
Model.hasMany(Movimentacao, { as: 'movimentacoes', foreignKey: 'demanda_id' });

const ModelVersion = new Version(Model);
ModelVersion.sync();
export default Model;