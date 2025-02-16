import express from "express";
import sequelize from "./app/utils/db_config.js";
import session from "express-session";

import modelValUser from "./app/api/v1/valUsers/router.js";
import modelUser from "./app/api/v1/users/router.js";

// import routerValidasiUsers from "./app/api/v1/valUsers/router.js";
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
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
// app.use(patternAPI, routerValidasiUsers);

app.set("view engine", "ejs"); // Menentukan engine tampilan
app.set("views", "./views"); // Pastikan folder views benar

app.use("/BEM_PeTIK", modelValUser);
app.use("/BEM_PeTIK", modelUser);

app.listen(3000, () => {
  console.log("Server is running...");
});
