import React, { useState, useEffect,useLayoutEffect } from "react"

import { Link } from "react-router-dom"


import { DNA } from 'react-loader-spinner'

import axios from "axios"

export default function User(props) {

  const [data, setData] = useState([])
  
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    allBlogData()
  }, [])

  useLayoutEffect(() => {
    setLoading(true)

    setTimeout(()=>{
      setLoading(false)
    },5000)
}, [])


  function allBlogData() {
    const token = localStorage.getItem("uid")

    axios.get("http://localhost:8081/blogs/getAllData", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      setData(value.data.allData)
    })
  }

  console.log("data", data);


  return (
    <>
    
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

      <div className={`${props.colors === "light" ? "bg-light" : "bg-dark"}`}>
        <div id="blog-header"></div>
        <div id="blog-cards">
          {data.map((value) => {
            return (
              <>
                <div className={`card user-card ${props.colors === "light"
                    ? "bg-light text-dark"
                    : "bg-dark text-light border"
                  }`} style={{ width: "18rem" }} key={value._id}>
                <div className="card-body">
                  <h5 className="card-title">{value.title.slice(0, 30)}......</h5>
                  <p className="card-text">{value.description.slice(0, 70)}......</p>
                  <Link to={`/blogPage/${value._id}`} className="btn btn-primary read-more-btn" onClick={() => { console.log(value._id); }}>Read More</Link>
                </div>
              </div >
            </>
        )
        })}
      </div>
    </div >

      }
    {/* <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div> */}
    </>
  )
}