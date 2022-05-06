// import sequelize from 'common/sequelize';
// import Sequelize from 'common/sequelize/sequelize';
// import Version from 'common/sequelize/version';
// import Usuario from 'common/models/portal/usuario';
// // import Tipo from './tipo';
// // import Status from './status';

// const Model = sequelize.define(
//     'demanda',
//     {
//         id: {
//             type: Sequelize.BIGINT,
//             primaryKey: true,
//             autoIncrement: true,
//         },

//         titulo: {
//             type: Sequelize.STRING(255),
//             allowNull: false,
//             // unique: true,
//         },

//         tipo_id: {
//             type: Sequelize.INTEGER,
//             allowNull: true,
//         },

//         status_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             defaultValue: 1,
//         },

//         uorInclusao_id: {
//             type: Sequelize.INTEGER,
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

//         uorResponsavel_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//         },

//         usuarioAlteracao_id: {
//             type: Sequelize.STRING(9),
//             allowNull: true,
//             associate: {
//                 model: 'Usuario',
//             },
//         },

//         dataHoraAlteracao: {
//             type: Sequelize.DATE,
//             allowNull: true,
//         },


//     },
//     {
//         // defaultScope: {
//         //     include: [
//         //         // {
//         //         //     model: Tipo,
//         //         //     as: 'tipo',
//         //         // },
//         //         {
//         //             model: Status,
//         //             as: 'status',
//         //         }
//         //     ]
//         // },
//         schema: 'demanda',
//         tableName: 'demanda',
//     },
// );

// // Model.belongsTo(Tipo, { as: 'tipo', foreignKey: 'tipo_id' });
// // Model.belongsTo(Status, { as: 'status', foreignKey: 'status_id' });

// // const ModelVersion = new Version(Model);
// // ModelVersion.sync();
// export default Model;