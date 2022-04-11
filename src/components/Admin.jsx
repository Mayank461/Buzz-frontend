import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_URL } from "../config";
export default function Admin(user) {
    const [post, allPost] = useState([])
    const [refresh,setRefresh] = useState(0)
 

    const { id } = useParams();
    useEffect(() => {
        //    console.log(user)
        axios
            .get(`${API_URL}/posts/allPost`)
            .then((res) => {
                allPost(res.data);
            })
            .catch((err) => console.log(err.message));


    },[refresh])
    const delPost = (e,id)=>{
        console.log(id)
        fetch(`${API_URL}/posts/delReport`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id:id
          
            }),
          }).then((r) => {
            setRefresh(refresh+1)
            console.log(r)
        });

    }
    return (
        <div className='container mt-5'>
            <div className="container">
                <h1 className='text-center'>Admin Panel</h1>
                <hr></hr>
                <div className="row p-3">
             


                   {post.map(element=>{  
                       if(element.report.length>0)
                       return (
                       <div className="col-md-4 shadow-lg p-3 mb-5 bg-body rounded">
                       <div className="">
                           {/* <img src="..." className="card-img-top" alt="..." /> */}
                           <div className="card-body">
                               <h5 className="card-title">This post is posted by</h5>
                               <p className="card-text">{element.posted_by}</p>
                               <h5 className="card-title">This post is reported by</h5>
                               <p className="card-text">{element.report}</p>
                               <button  className="btn btn-danger" onClick={(e)=>delPost(e,element._id)}>Delete this post</button>
                           </div>
                       </div>
                   </div>
                   )})}

                </div>
            </div>
        </div>
    )
}
