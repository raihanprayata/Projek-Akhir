import modelUsers from "../users/model.js";
import modelValUser from "../valUsers/model.js";

// Hubungkan relasi antar tabel
modelValUser.hasOne(User, { foreignKey: "nim" });
modelUsers.belongsTo(modelValUser, { foreignKey: "nim" });

export { modelUsers, modelValUser };
