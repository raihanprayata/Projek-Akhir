import express from "express";
import sequelize from "./app/utils/db_config.js";
import routerValidasiUsers from "./app/api/v1/valUsers/router.js";
const app = express();
const patternAPI = "/API/v1";

//cek kondisi DB
// app.get("/", async (req, res) => {
//   //kalau kondisinya bener try dijalanan
//   //kalo salah catchnya yang dijalanin
//   try {
//     await sequelize.authenticate();
//     console.log("Database berhasil konek");
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// app.use("/mahasiswa", routerMahasiswa);
app.use(express.json());
app.use(patternAPI, routerValidasiUsers);

app.listen(3000, () => {
  console.log("Server is running...");
});
