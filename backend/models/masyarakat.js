'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masyarakat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  masyarakat.init({
    id_masyarakat: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
    nik: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'masyarakat',
    tableName: 'masyarakat'
  });
  return masyarakat;
};