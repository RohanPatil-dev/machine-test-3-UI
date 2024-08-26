import axios from "axios";
import React, { useState, useEffect,useLayoutEffect } from "react"

import { DNA } from 'react-loader-spinner'

import { ToastContainer, toast } from "react-toastify"

import { useParams } from "react-router-dom"

export default function Blogpage(props) {

  const [data, setData] = useState([])

  const [comments, setComments] = useState([])

  const [addComment, setAddComments] = useState("")

  const [height, setHeight] = useState("460px")
  const [overflow, setOverflow] = useState("hidden")

  const [hover, setHover] = useState("blue");

  const [loading,setLoading] = useState(false)

  useLayoutEffect(() => {
    setLoading(true)

    setTimeout(()=>{
      setLoading(false)
    },5000)
}, [])

  useEffect(() => {
    blogData()
    showComments()
  }, [comments])

  // const params = useParams()

  //   console.log("userparam",params);

  //   let value = JSON.stringify(params.id)

  //   console.log("real",value);

  const { id } = useParams()
  const token = localStorage.getItem("uid")


  function blogData() {
    try {
      axios.get(`http://localhost:8081/blogs/singleData/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((value) => {
        console.log(value);
        setData(value.data.allData)
      })
    } catch (error) {
      toast.error(`Error is ${error}`)
    }
  }

  const value = {
    content: addComment
  }

  function addComments() {
    try {
      axios.post(`http://localhost:8081/comments/blog/${id}/reviews`, value, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((value) => {
        console.log(value);
        toast.success("Comment added Successfully !")
      })
    } catch (error) {
      toast.error(`Error is ${error}`)
    }
  }

  function showComments() {
    try {
      axios.get(`http://localhost:8081/comments/blog/${id}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((value) => {
        console.log(value.data);
        setComments(value.data);
      })
    } catch (error) {

    }
  }

  function manageHeight() {
    if (height === "460px") {
      setHeight(null)
      setOverflow("none")

      setHover("red")
    } else {
      setHeight("460px")
      setOverflow("hidden")
      setHover("blue")
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

      <div className={`${props.colors === "light" ? "bg-light" : "bg-dark"}`} style={{height: "97rem"}} >
      <div className={`blog ${props.colors === "light" ? "text-dark" : "text-light"}`} style={{ height: height, overflow: overflow }}>
        <img src={`http://localhost:8081/uploads/blogs/${data.coverImage}`} alt={`${data.coverImage}`} height="400px" width="800px" style={{ marginLeft: "100px", marginTop: "20px" }} />
        
        <div className="title">{data.title}</div>

        <div className="description" style={{ width: "65rem" }}>{data.description}</div>
      </div>

      <button type="button" className={`btn btn-success manage ${hover}`} onClick={() => { manageHeight() }}>Read More</button>

      <div id="underline"></div>

      <div id="comments">
        <form onSubmit={addComments}>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1" className={`${props.colors === "light" ? "text-dark" : "text-light"}`} style={{ fontSize: "40px", fontWeight: "600" }}>Write comments</label>
            <textarea className="form-control" value={addComment} onChange={(event) => { return setAddComments(event.target.value) }} style={{ overflow: "auto", resize: "none" }} placeholder="Enter your comments..............."></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "200px", padding: "5px", fontSize: "20px" }}>Submit</button>

        </form>
      </div>

      <div className="comments">
        {
          comments == [] ? "Empty comments" :
            comments.map((value) => {
              return (
                <>
                  <div class="card" style={{position : "relative",width: "22rem",height : "100px" }}>
                    <div class="card-body">
                      <p>Comment ID : <span>{value._id}</span></p>
                      <p>USER COMMENT : <span>{value.content}</span></p>
                    </div>
                  </div>
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