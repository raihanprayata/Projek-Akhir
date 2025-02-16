// import { DataTypes } from "sequelize";
// import sequelize from "../../../utils/db_config.js";

import { DataTypes } from "sequelize";
import sequelize from "../../../utils/db_config.js";
import ValidasiUser from "../valUsers/model.js"; // Import ValidasiUser

const User = sequelize.define(
  "users",
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
      references: {
        model: ValidasiUser, // Relasi ke validasi_user
        key: "nim",
      },
    },
    nama_lengkap: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "admin", "user"),
      allowNull: false, // Role harus diisi saat login
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // Tidak perlu createdAt dan updatedAt
  }
);

sequelize.sync({ alter: true });
export default User;
