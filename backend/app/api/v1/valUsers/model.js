// import { DataTypes } from "sequelize";
// import sequelize from "../../../utils/db_config.js";

import { DataTypes } from "sequelize";
import sequelize from "../../../utils/db_config.js";

const ValidasiUser = sequelize.define(
  "validasi_user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nim: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    nama_lengkap: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    divisi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "admin", "user"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // Akan menambahkan kolom createdAt dan updatedAt secara otomatis
  }
);

sequelize.sync();
export default ValidasiUser;
