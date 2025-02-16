import bcrypt from "bcrypt";
import User from "../users/model.js";
import ValidasiUser from "../valUsers/model.js";

const showLoginPage = (req, res) => {
  res.render("login", { errorMessage: null }); // Merender login.ejs
};

const login = async (req, res) => {
  const { nim, password } = req.body;

  try {
    const user = await User.findOne({ where: { nim } });
    if (!user) {
      return res.render("login", { errorMessage: "NIM tidak ditemukan!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { errorMessage: "Password salah!" });
    }

    const validasiUser = await ValidasiUser.findOne({ where: { nim } });
    if (!validasiUser) {
      return res.render("login", { errorMessage: "User belum divalidasi!" });
    }

    // Tentukan role berdasarkan divisi
    let role = "admin";
    if (validasiUser.divisi === "Lainnya") {
      role = "user"; // Jika divisi "Lainnya", role = user
    }

    // Simpan ke session
    req.session.user = {
      id: user.id,
      nim: user.nim,
      role: role,
      divisi: validasiUser.divisi,
    };

    // Update role di tabel user
    await User.update({ role: role }, { where: { nim: user.nim } });

    return res.redirect("/BEM_PeTIK/beranda_user");
  } catch (error) {
    console.error("Error di login:", error.message);
    return res.render("login", { errorMessage: "Terjadi kesalahan server" });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Gagal logout" });
    }
    res.json({ message: "Logout berhasil!" });
  });
};

export { login, logout, showLoginPage };
