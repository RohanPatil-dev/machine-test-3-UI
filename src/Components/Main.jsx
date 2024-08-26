import React,{useState} from "react"
import Signin from "./Signin"

import "../CSS/Style.css"
import SignUp from "./SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Author from "./Author"
import User from "./User"
import Blogpage from "./Blogpage"
import Update from "./Update"

export default function Main() {

  
  const [colors, setColors] = useState({
    color : "light",
    backgroundColor : "light",
    text : "Enable Dark Mode"
  })


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar colors={colors.color} background={colors.backgroundColor} text={colors.text} setColors={setColors} />}>
            <Route path="/" element={<Signin colors={colors.color} background={colors.backgroundColor} text={colors.text} setColors={setColors} />} />
            <Route path="/signup" element={<SignUp colors={colors.color} background={colors.backgroundColor} text={colors.text} setColors={setColors} />} />
            <Route path="/author" element={<Author colors={colors.color} background={colors.backgroundColor} text={colors.text} setColors={setColors} />} />
            <Route path="/user" element={<User colors={colors.color} background={colors.backgroundColor} text={colors.text} setColors={setColors} />} />
            <Route path="/blogPage/:id" element={<Blogpage colors={colors.color} background={colors.backgroundColor} text={colors.text} setColors={setColors} />} />
            <Route path="/updateBlog/blogs/:id" element={<Update colors={colors.color} background={colors.backgroundColor} text={colors.text} setColors={setColors} />} />
          </Route>

          {/* <Route path="/author" element={<Author />} />
          <Route path="/user" element={<User />} />
          <Route path="/blogPage/:id" element={<Blogpage />} /> */}
        </Routes>
      </BrowserRouter>

    </>
  )
}