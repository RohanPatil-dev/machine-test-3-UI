import axios from "axios"
import React, { useState, useEffect, useLayoutEffect } from "react"
import { Link } from "react-router-dom"

import { DNA } from 'react-loader-spinner'

import { ToastContainer, toast } from "react-toastify"
import Modal from "./Modal"

export default function Author(props) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [loading, setLoading] = useState(false)

  const [blog, setBlog] = useState([])

  const [coverImage, setCoverImage] = useState(null)

  const [deleted,setDeleteData] = useState(null)

  useLayoutEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  useEffect(() => {
    renderBlog()
  }, [blog])


  const token = localStorage.getItem("uid")

  const data = {
    title: title,
    description: description,
    coverImage: coverImage
  }

  function postBlog(event) {
    event.preventDefault()
    try {
      axios.post("http://localhost:8081/blogs/addBlogs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }).then((value) => {
        console.log(value);
        toast.success("Blog added successfully !")
      })
    } catch (error) {
      toast.error(`Error is ${error}`)
    }
  }


  function renderBlog() {
    try {
      axios.get("http://localhost:8081/blogs/renderBlog", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((value) => {
        console.log(value.data.allData);
        setBlog(value.data.allData)
      })
    } catch (error) {
      toast.error(`Error is ${error}`)
    }
  }


  function getDeleteData(id) {
     setDeleteData(id)
  }

  return (
    <>
      <ToastContainer />

      {
        loading ?
          <div style={{ backgroundColor: props.colors === "dark" ? "#333" : "#fff", height: "45rem" }}>
            <DNA
              visible={true}
              height="360"
              width="360"
              ariaLabel="dna-loading"
              wrapperStyle={{ marginLeft: "530px", marginTop: "100px" }}
              wrapperClass="dna-wrapper"
            />
          </div>
          :
          <div className={`${props.colors === "light" ? "bg-light" : "bg-dark"} blog-writer-box`}>
            <div id="blog-writer" className={`${props.colors === "light" ? "text-dark" : "text-light"}`}>
              <form action="" onSubmit={postBlog}>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1" style={{ fontSize: "25px", fontWeight: "600" }}>Cover Image :</label>
                  <input type="file" className="form-control" onChange={(event) => { return setCoverImage(event.target.files[0]) }} id="exampleFormControlInput1" placeholder="Enter your blog title" />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1" style={{ fontSize: "25px", fontWeight: "600" }}>Blog title</label>
                  <input type="text" className="form-control" value={title} onChange={(event) => { return setTitle(event.target.value) }} id="exampleFormControlInput1" placeholder="Enter your blog title" />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1" style={{ fontSize: "25px", fontWeight: "600" }}>Blog Description</label>
                  <textarea className="form-control" value={description} onChange={(event) => { return setDescription(event.target.value) }} id="exampleFormControlTextarea1" rows="3" style={{ height: "300px", overflow: "auto", resize: "none" }} placeholder="Enter your blog description"></textarea>
                </div>

                <button type="submit" className="btn btn-primary blogger">Submit</button>
              </form>
            </div>

            <div id="allBlogs">
              {
                blog.map((value) => {
                  return (
                    <>
                      <div className={`card ${props.colors === "light" ? "bg-light text-dark" : "bg-dark text-light border-light"}`} style={{ width: "18rem" }} key={value._id}>
                        <div className="card-body">
                          <img src={`http://localhost:8081/uploads/blogs/${value.coverImage}`} alt={`${value.coverImage}`} style={{height : "70px",width : "220px"}}/>
                          <h5 className="card-title">{value.title.slice(0, 30)}.....</h5>
                          <p className="card-text">{value.description.slice(0, 70)}.....</p>
                          <a href="#" className="btn btn-danger delete"  data-toggle="modal" data-target=".bd-example-modal-lg" onClick={()=>{getDeleteData(value._id)}}>Delete Blog</a>
                          <Link to={`/updateBlog/blogs/${value._id}`} className="btn btn-success ml-3 update">Update Blog</Link>
                        </div>
                      </div>


                      <Modal deleted={deleted} />
                    </>
                  )
                })
              }
            </div>
          </div>
      }
    </>
  )
}


