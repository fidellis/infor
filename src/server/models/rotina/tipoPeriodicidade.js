import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'TipoPeriodicidadeRotina',
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
        tableName: 'tipo_periodicidade',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'Dia útil' }),
    Model.upsert({ id: 2, nome: 'Dia corrido' }),
]));

export default Model;