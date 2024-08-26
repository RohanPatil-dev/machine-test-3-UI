import axios from "axios";
import React from "react"

import {  toast } from "react-toastify"

export default function Modal(props) {

    const token = localStorage.getItem("uid")

    function deleteBlog() {
        try {
          axios.delete(`http://localhost:8081/blogs/deleteData/${props.deleted}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((value) => {
            console.log(value);
            toast.success("Blog deleted successfully !")
          })
        } catch (error) {
          toast.error(`Error is ${error}`)
        }
      }


  return (
<div class="modal fade bd-example-modal-lg p-3" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <h4 className="text-center">Do you want to delete this data ? </h4>

      <div className="p-3 prompt">
         <button type="button" className="btn btn-danger"  data-dismiss="modal" onClick={()=>{deleteBlog()}}>Delete Blog</button>
         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close prompt</button>
      </div>
    </div>
  </div>
</div>
  )
}