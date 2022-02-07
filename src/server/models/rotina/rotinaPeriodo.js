import sequelize from 'common/sequelize';
import Sequelize from 'common/sequelize/sequelize';

const Model = sequelize.define(
    'PeriodoRotina',
    {
        rotina_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },

        mes: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        // diaInicio: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        // },

        // diaFim: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        // },
    },
    {
        schema: 'rotina',
        tableName: 'rotina_periodo',
    },
);

export default Model;