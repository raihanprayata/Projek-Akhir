import bcrypt from "bcrypt";
import User from "./model.js";
import ValidasiUser from "../valUsers/model.js";

export const login = async (req, res) => {
  const { nim, password } = req.body;

  try {
    const user = await User.findOne({ where: { nim } });

    if (!user) {
      return res.status(401).json({ message: "NIM tidak ditemukan!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah!" });
    }

    req.session.user = {
      id: user.id,
      nim: user.nim,
      role: user.role,
    };

    return res.json({ message: "Login berhasil!", role: user.role });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Gagal logout" });
    }
    res.json({ message: "Logout berhasil!" });
  });
};
