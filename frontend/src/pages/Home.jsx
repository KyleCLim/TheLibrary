import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {

    const [posts, setPosts] = useState([]);

    const cat = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
                setPosts(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]); 

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    const getDesc = (desc) => {
        const shortDesc = desc.slice(0, 100);
        return shortDesc
    };

    return (
        <div className="home">
            <div className="posts">
                {posts.map(post => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="image" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(getDesc(post.desc)) + " ..."}</p>
                            <button><Link className="link" to={`/post/${post.id}`}>Read More</Link></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;