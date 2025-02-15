import { DataTypes } from "sequelize";
import sequelize from "../../../utils/db_config.js";

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
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "admin", "user"),
      allowNull: false,
    },
  },
  { timestamps: false }
);

sequelize.sync();
export default User;
