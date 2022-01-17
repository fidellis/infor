import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'PeriodicidadeRotina',
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
        tableName: 'periodicidade',
    },
);

Model.afterSync(() => Promise.all([
    Model.upsert({ id: 1, nome: 'Diária' }),
    Model.upsert({ id: 2, nome: 'Semanal' }),
    Model.upsert({ id: 3, nome: 'Mensal' }),
    Model.upsert({ id: 4, nome: 'Trimestral' }),
    Model.upsert({ id: 5, nome: 'Semestral' }),
    Model.upsert({ id: 6, nome: 'Anual' }),
    Model.upsert({ id: 7, nome: 'Eventual' }),
]));

export default Model;