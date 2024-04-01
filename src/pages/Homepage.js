import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";
import { useNavigate } from "react-router";

function Homepage() {
    const [homepageBlogs, setHomepageBlogs] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login")

        } else {
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/blog/homepage-blogs`, {
                    headers: {
                        "X-Acciojob": token,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setHomepageBlogs(res.data.data);
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }, [token]);

    return (
        <div>
            <h1 style={{ margin: "30px" }} >Homepage</h1>

            {homepageBlogs?.length > 0 ? homepageBlogs.map((blog) => (
                <BlogCard blogData={blog} homepage={true} />
            )) : <h4 style={{ margin: "30px",  textAlign: "center"}} >Please follow few  <a href="/users">Peoples</a> first</h4>}
        </div>
    );
}

export default Homepage;