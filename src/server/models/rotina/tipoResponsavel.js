import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'TipoResponsavelRotina',
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

        ativo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        schema: 'rotina',
        tableName: 'tipo_responsavel',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'Principal' }),
    Model.upsert({ id: 2, nome: 'Lateral 1' }),
    Model.upsert({ id: 3, nome: 'Lateral 2' }),
]));

export default Model;