import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";
import { useNavigate } from "react-router";
import { ToastContainer } from 'react-toastify';
import { Button } from "react-bootstrap";


function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState(null);
  const token = localStorage.getItem("token");
  const userobj = JSON.parse(localStorage.getItem("userobj"))
  console.log(userobj)


  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/login")
    } else {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-blogs`, {
          headers: {
            "X-Acciojob": token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setMyBlogs(res.data.data);
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

      <div className="d-flex flex-row justify-content-between m-4">
        <div>
          <h1 >Welcome {(userobj.name.toUpperCase())}</h1>

        </div>
        <div>

          <Button> Posts :{myBlogs ? myBlogs.length
            : "0"}{console.log(myBlogs)}

          </Button>
        </div>

      </div>



      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />



      {!myBlogs ? (<p>No Blog Found Create Some Blogs..</p>) : ("")}
      {myBlogs?.map((blog) => (
        <BlogCard blogData={blog} />
      ))}
    </div>
  );
}

export default MyBlogs;