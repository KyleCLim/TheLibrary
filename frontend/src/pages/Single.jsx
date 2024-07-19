import React, { useContext, useState, useEffect } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment"; //shows the difference of the date and the current date in "days" format
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Picture from "../img/avatar.webp";

const Single = () => {
    const [post, setPost] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);
    const authorImg = post.userImg;
    console.log(post);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/posts/${postId}`
                );
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
                withCredentials: true,
            });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <div className="single">
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="image" />
                <div className="user">
                    {authorImg ? (
                        <img
                            src={`../upload/userProfile/${authorImg}`}
                            alt="image"
                        />
                    ) : (
                        <img src={Picture} alt="image" />
                    )}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="edit icon" />
                            </Link>
                            <img
                                onClick={handleDelete}
                                src={Delete}
                                alt="delete icon"
                            />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                {getText(post.desc)}
            </div>
            <Menu cat={post.cat} />
        </div>
    );
};

export default Single;
