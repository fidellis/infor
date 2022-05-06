// import sequelize from 'common/sequelize';
// import Sequelize from 'common/sequelize/sequelize';
// import Status from './status';

// const Model = sequelize.define(
//     'movimentacaoDemanda',
//     {
//         id: {
//             type: Sequelize.BIGINT,
//             primaryKey: true,
//             autoIncrement: true,
//         },

//         uorOrigem_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             associate: {
//                 model: 'UOR',
//             },
//         },

//         uorDestino_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             associate: {
//                 model: 'UOR',
//             },
//         },

//         status_id: {
//             type: Sequelize.BIGINT,
//             allowNull: false,
//         },

//         usuarioInclusao_id: {
//             type: Sequelize.STRING(9),
//             allowNull: false,
//             associate: {
//                 model: 'Usuario',
//             },
//         },

//         dataHoraInclusao: {
//             type: Sequelize.DATE,
//             allowNull: false,
//             defaultValue: Sequelize.NOW,
//         },
//     },
//     {
//         schema: 'demanda',
//         tableName: 'movimentacao',
//     },
// );


// Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });
// export default Model;