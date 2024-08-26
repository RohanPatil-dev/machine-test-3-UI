import axios from "axios";
import React, { useEffect, useState,useLayoutEffect } from "react"

import { useParams } from "react-router-dom"

import { ToastContainer, toast } from "react-toastify"

import { DNA } from 'react-loader-spinner'

export default function Update(props) {

  const token = localStorage.getItem("uid")

  const [data, setData] = useState({ title: "", description: "" })

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [loading,setLoading] = useState(false)

  const { id } = useParams()

  console.log(data);
  console.log("title", title);
  console.log("description", description);

  useLayoutEffect(() => {
    setLoading(true)

    setTimeout(()=>{
      setLoading(false)
    },5000)
}, [])


  useEffect(() => {
    blogData()
  }, [])


  function blogData() {
    try {
      axios.get(`http://localhost:8081/blogs/singleData/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((value) => {
        console.log(value);
        let data = value.data.allData
        setData(data)
        setTitle(data.title)
        setDescription(data.description)

      })
    } catch (error) {
      toast.error(`Error is ${error}`)
    }
  }


  function updateBlog(event) {
    event.preventDefault()

    try {
      axios.put(`http://localhost:8081/blogs/updateData/${id}`, { title, description }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((value) => {
        console.log("updated data", value);
        toast.success("Blog updated successfully !")
      })
    } catch (error) {
      toast.error(`Error is ${error}`)
    }
  }

  return (
    <>
      <ToastContainer />

      {
  loading ?
<div style={{backgroundColor: props.colors === "dark" ? "#333" : "#fff",height : "45rem"}}>
    <DNA
    visible={true}
    height="360"
    width="360"
    ariaLabel="dna-loading"
    wrapperStyle={{marginLeft: "530px",marginTop : "100px" }}
    wrapperClass="dna-wrapper"
    />
</div>
     : 

      <div className={`${props.colors === "light" ? "bg-light" : "bg-dark"}`} style={{height: "44.7rem"}}>
        <div id="blog-update" className={`${props.colors === "light" ? "text-dark" : "text-light"}`}>
          <form action="" onSubmit={updateBlog}>
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
      </div>
}
    </>
  )
}