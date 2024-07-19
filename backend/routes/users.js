import express from "express";
import { getPosts, updateUserImg, addUserImg } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getPosts);
router.put("/:id", updateUserImg);
router.post("/:id", addUserImg);

export default router;
