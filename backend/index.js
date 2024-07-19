import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

////////////////////--STORING OF CONTENT COVER PHOTO---///////////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/public/upload"); //path to where the uploaded file is to be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); //name of the file upon uploaded
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;

    res.status(200).json(file.filename);
});

//////////////////--STORING OF USER PROFILE PIC---////////////////////////////
const profPic = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/public/upload/userProfile"); //path to where the uploaded file is to be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); //name of the file upon uploaded
    },
});

const uploadPic = multer({ storage: profPic });

app.post(
    "/api/userprofile",
    uploadPic.single("userProfImg"),
    function (req, res) {
        const userProfImg = req.file;

        res.status(200).json(userProfImg.filename);
    }
);

/////////////////---GENERAL ROUTES---//////////////////////
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
    console.log("Connected");
});
