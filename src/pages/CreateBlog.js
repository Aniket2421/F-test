import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';


function CreateBlog() {
    const [title, setTitle] = useState();
    const [textBody, setTextBody] = useState();
    const [loading, setloading] = useState(false);
    const navigate = useNavigate()


    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
        }
        console.log(token)

    }, [token]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setloading(true)

        const blogObj = {
            title,
            textBody,
        };
        const url = `${process.env.REACT_APP_BACKEND_URL}/blog/create-blog`

        axios
            .post(url, blogObj, {
                headers: {
                    "X-Acciojob": token,
                },
            })
            .then((res) => {
                if (res.data.status === 201) {
                    setloading(false)
                    toast.success("Blog Created SucessFully");
                    setTimeout(() => {
                        navigate("/my-blogs")

                    }, 560)

                } else {
                    alert(res.data.message);
                    setloading(false)
                }
            })
            .catch((err) => {
                alert(err);
                setloading(false)
            });


    };

    return (
        <div style={{ margin: "50px" }}>
            <ToastContainer position="top-right" autoClose={500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <h1 style={{ marginBottom: "20px" }}>Create Blog</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="textbody">
                    <Form.Label>TextBody</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter Text Body"
                        onChange={(e) => setTextBody(e.target.value)}
                    />
                </Form.Group>
                <Button className=" shadow-lg" type="submit" disabled={loading}> {loading ? ("Loading...") : ("Create Blog")}</Button>

            </Form>
        </div>
    );
}

export default CreateBlog;