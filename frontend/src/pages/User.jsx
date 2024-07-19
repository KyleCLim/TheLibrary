import React, { useState, useContext, useEffect } from "react";
import Picture from "../img/avatar.webp";
import Camera from "../img/cameraWhite.png";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const userImg = currentUser.img;

    const [displayImage, setDisplayImage] = useState(userImg);
    const [uploadedImage, setUploadedImage] = useState();

    const uid = currentUser.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/users/${uid}`
                );
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const upload = async () => {
        console.log("got here in upload");
        try {
            const formData = new FormData();

            formData.append("userProfImg", uploadedImage); // "userProfImg" is the same name in the index.js uploadPic.single('userProfImg')
            const res = await axios.post(
                "http://localhost:8800/api/userprofile",
                formData
            );

            console.log("res", res);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const profImgUrl = await upload();
        console.log("profImgUrl", profImgUrl);

        const savedUserData = localStorage.getItem("user"); //getting the item from localStorage

        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            const updatedData = { ...userData, img: profImgUrl };
            localStorage.setItem("user", JSON.stringify(updatedData));
        }

        try {
            await axios.post(
                `http://localhost:8800/api/users/${uid}`,
                {
                    //If there is no profpic yet
                    img: profImgUrl ?? "",
                },
                { withCredentials: true }
            );
            navigate("/user");
        } catch (err) {
            console.log(err);
        }
    };

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    const getDesc = (desc) => {
        const shortDesc = desc.slice(0, 100);
        return shortDesc;
    };

    let profileImage = Picture;

    if (displayImage) {
        profileImage = `../upload/userProfile/${displayImage}`;
    }

    if (uploadedImage) {
        profileImage = URL.createObjectURL(uploadedImage);
    }

    return (
        <div className="profile">
            <div className="picture">
                <img
                    className="profPic"
                    src={profileImage}
                    alt="profile picture"
                />
                <input
                    style={{ display: "none" }}
                    type="file"
                    name="profpic"
                    id="profpic"
                    onChange={(e) => {
                        const imageFile = e.target.files[0];
                        setUploadedImage(imageFile);
                    }}
                />
                <label className="file userButtons" htmlFor="profpic">
                    <div className="changePicContainer">
                        <img
                            className="changePic"
                            src={Camera}
                            alt="change picture icon"
                        />
                        <p>Change Image</p>
                    </div>
                    <button onClick={handleClick}>Save Change</button>
                </label>
            </div>
            <div className="userInfo">
                <h1>{currentUser.username}</h1>
                <p>{currentUser.email}</p>
            </div>
            <div className="userPosts">
                <h2>Your Posts</h2>
                <div className="posts">
                    {posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="img">
                                <img
                                    src={`../upload/${post.img}`}
                                    alt="image"
                                />
                            </div>
                            <div className="content">
                                <Link className="link" to={`/post/${post.id}`}>
                                    <h2>{post.title}</h2>
                                </Link>
                                <p>{getText(getDesc(post.desc)) + " ..."}</p>
                                <button>
                                    <Link
                                        className="link"
                                        to={`/post/${post.id}`}
                                    >
                                        Read More
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default User;
