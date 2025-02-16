import express from "express";
import { getDataUser } from "./controller.js";

const router = express.Router();

router.post("/user", getDataUser);

export default router;
