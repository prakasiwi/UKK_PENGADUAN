'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pengaduan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.masyarakat, {
        foreignKey: 'nik',
        as: 'masyarakat'
      })
      
      this.hasOne(models.tanggapan, {
        foreignKey: 'id_pengaduan',
        as: 'tanggapan'
      })
    }
  };
  pengaduan.init({
    id_pengaduan: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nik: DataTypes.STRING,
    jenis: DataTypes.STRING,
    isi_laporan: DataTypes.TEXT,
    status: DataTypes.STRING,
    foto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'pengaduan',
    tableName: "pengaduan"
  });
  return pengaduan;
};