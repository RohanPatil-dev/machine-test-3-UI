import React, { useState } from "react"

import { useNavigate } from "react-router-dom"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios"

export default function SignUp() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    const [userImage, setUserImage] = useState(null)

    console.log("userName : " + userName, " email : " + email, "password : " + password, "role : ", role);

    const data = {
        username: userName,
        email: email,
        password: password,
        role: role,
        userImage: userImage
    }

    function registration(event) {
        event.preventDefault()
        if (!data.username && !data.email && !data.password && !data.role) {
            toast.error("Form is empty !")
        } else if (!data.username) {
            toast.error("Username is not defined !")
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
        } else if (!data.role) {
            toast.error("Please select your role !")
        }
        else {
            let result = axios.post("http://localhost:8081/register", data, {
                headers : {
                     "Content-Type": "multipart/form-data"
                }
            })

            if (result) {
                navigate("/")
            }

            toast.success("Signup successfully !")
        }
    }


    return (
        <>
            <ToastContainer />
            <div id="signup-grid">
                <div>
                    <img src="./Images/blogify.png" alt="" className="signup-img" />
                </div>

                <div id="signup">
                    <form onSubmit={registration}>
                        <div className="form-group">
                            <label htmlFor="exampleInputUserName1" style={{ fontSize: "20px" }}>Username</label>
                            <input type="text" value={userName} onChange={(event) => { return setUserName(event.target.value) }} name="username" className="form-control signup-input" id="exampleInputUserName1" aria-describedby="emailHelp" placeholder="Enter Username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" style={{ fontSize: "20px" }}>Email address</label>
                            <input type="email" value={email} onChange={(event) => { return setEmail(event.target.value) }} name="email" className="form-control signup-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" style={{ fontSize: "20px" }}>Password</label>
                            <input type="password" value={password} onChange={(event) => { return setPassword(event.target.value) }} name="password" className="form-control signup-input" id="exampleInputPassword1" placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1" style={{ fontSize: "20px" }}>Select Role</label>
                            <select className="form-control signup-input" id="exampleFormControlSelect1" style={{ height: "50px", fontSize: "15px" }} value={role} onChange={(event) => { return setRole(event.target.value) }}>
                                <option value={"user"}>user</option>
                                <option value={"blogger"}>blogger</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" style={{ fontSize: "20px" }}>Cover Image :</label>
                            <input type="file" className="form-control" onChange={(event) => { return setUserImage(event.target.files[0]) }} id="exampleFormControlInput1" placeholder="Enter your blog title" />
                        </div>

                        <button type="submit" className="btn btn-primary signin-btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}