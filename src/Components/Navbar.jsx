import axios from "axios"
import React, { useState, useLayoutEffect } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"


const token = localStorage.getItem("uid")

export default function Navbar(props) {


    const navigate = useNavigate()

    function logout() {
        const logout = localStorage.removeItem("uid")

        navigate("/")
    }

    const [img, setImage] = useState("")
    const [username, setUsername] = useState("")

    console.log(img, "", username);


    useLayoutEffect(() => {
        if (token) {
            userImage();
        }

    }, [token]);

    function turnOn() {
        props.colors === "light" ? props.setColors({ color: "dark", backgroundColor: "dark", text: "Dark mode enabled" }) : props.setColors({ color: "light", backgroundColor: "light", text: "Light Mode Enabled" })
    }


    function userImage() {

        try {
            axios.get("http://localhost:8081/userImg", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((value) => {
                console.log(value);

                setUsername(value.data.username)
                setImage(value.data.profileImg)
            })
        } catch (error) {
            console.log("nothing happened");

        }
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${props.colors} bg-${props.background} p-3 fontSize`} id="navbar">
                <Link className="navbar-brand" style={{ fontSize: "25px", fontWeight: "bold", fontStyle: "oblique" }} to="#"><span style={{ color: "red" }}>Blogger</span> APP</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto" id="nav-li">
                        {
                            token ? <>

                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src={`http://localhost:8081/uploads/users/${img}`} className="uploaded-img" alt="" />
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <span class="dropdown-item text-center" style={{ fontSize: "17px" }} href="#">{username}</span>
                                        <a to="#" style={{ width: "170px", fontWeight: "600" }} className={`btn active dropdown-item text-${props.colors === "light" ? "dark" : "light"} `} role="button" aria-pressed="true" onClick={() => { turnOn() }}>{props.text}</a>
                                        <Link className="nav-link dropdown-item mt-2 text-dark ml-1" style={{ width: "160px" }} to="/" onClick={() => { logout() }}>Logout</Link>
                                    </div>
                                </li>


                            </> :
                                <>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Login</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/signup">Register</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </nav>

            <Outlet />
        </>
    )
}