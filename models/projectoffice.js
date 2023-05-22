'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projectoffice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projectoffice.init(
    {
      licensedProject: DataTypes.TEXT,
      planForm: DataTypes.STRING,
      payrollForm: DataTypes.STRING,
      paymentOrderForm: DataTypes.STRING,
      monthlyReportExpert: DataTypes.STRING,
      promotionExpert: DataTypes.STRING,
      accountant: DataTypes.STRING,
      typist: DataTypes.STRING,
      contractForm: DataTypes.STRING,
      organizedOffice: DataTypes.STRING,
      orgId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Projectoffice',
    }
  );
  Projectoffice.associate = function (models) {
    Projectoffice.belongsTo(models.Organization, {
      foreignKey: 'orgId',
      //onDelete: 'CASCADE',
    });

    // associations can be defined here
  };
  return Projectoffice;
};
