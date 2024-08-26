import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"


import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom"

export default function Signin(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const data = {
        email: email,
        password: password
    }

    function signin(event) {
        event.preventDefault()

        if (!data.email && !data.password) {
            toast.error("Form is empty !")
        } else if (!data.email) {
            toast.error("Email is not defined !")
        } else if (!data.password) {
            toast.error("Password is not defined !")
        }
        else if (data.password.length > 8) {
            toast.error("password is over the 8 characters !")
        }
        else if (data.password.length < 8) {
            toast.error("password is under the 8 characters !")
        }
        else {
            axios.post("http://localhost:8081/login", data).then((value) => {
                console.log(value);
                console.log("role is", value.data.role);

                localStorage.setItem("uid", value.data.token)

                if (value.data.role === "blogger") {
                    navigate("/author")
                } else {
                    navigate("/user")
                }

                toast.success("User login Successfully !")

            }).catch(() => {
                toast.error("Invalid email or password !");
            })
        }


    }

    return (
        <>

            <ToastContainer />
            <div id="signin-background">
                <img src="./Images/logo.png" alt="Image Not Found !" id="logo" />
                <div id="signin">
                    <form onSubmit={signin}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" style={{ fontSize: "20px" }}>Email address</label>
                            <input type="email" name="email" value={email} onChange={(event) => { return setEmail(event.target.value) }} className="form-control signin-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" style={{ fontSize: "20px" }}>Password</label>
                            <input type="password" name="password" value={password} onChange={(event) => { return setPassword(event.target.value) }} className="form-control signin-input" id="exampleInputPassword1" placeholder="Password" />
                        </div>

                        <p id="link">Don't have acount ? <Link to="/signup">Register here</Link></p>

                        <button type="submit" className="btn btn-primary signin-btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}