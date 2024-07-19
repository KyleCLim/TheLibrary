import { db } from "../db.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const getPosts = (req, res) => {
    const q = req.params.id
        ? "SELECT * FROM posts WHERE uid=? ORDER BY id DESC"
        : null;

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};

export const updateUserImg = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.TOKEN_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "UPDATE users SET `img`=? WHERE `id` = ?";
        const values = [req.body.profpic, userInfo.id];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Profile picture has been updated.");
        });
    });
};

export const addUserImg = (req, res) => {
    const token = req.cookies.access_token;
    const userId = req.params.id;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.TOKEN_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "UPDATE users SET `img`=? WHERE `id` = ?";
        const values = [req.body.img, Number(userId)];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);

            return res.json("Post has been created.");
        });
    });
};
