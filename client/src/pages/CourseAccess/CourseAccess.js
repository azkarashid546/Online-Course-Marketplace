import React, { useEffect } from 'react'
import {useParams} from "react-router-dom"
import { useLoadUserQuery } from '../../redux/features/api/apiSlice'
import { useNavigate } from 'react-router-dom'
import Loader from "../../components/Loader/Loader"
import CourseContent from "../../components/Course/CourseContent"
const CourseAccess = () => {
  let navigate = useNavigate()
    const {id} = useParams()
  
    const {isLoading, error, data} = useLoadUserQuery(undefined, {})
    console.log(data)
    console.log("user",data)
    useEffect(() => {
      if (data && data.role === "user") {
    const isPurchased = data?.user?.courses.find((item) => item._id === id)
    if(!isPurchased){
    navigate(`/`)
    }
  }
    if(error){
      navigate("/")
    }
    }, [data, error])

  return (
    <>
    <div className="" style={{maxWidth : "1200px", margin : "auto"}}>

   
      {
        isLoading ? (<Loader/>) :
        (
          <>
           <CourseContent id={id} user={data.user}/>
          </>
        )
      }
       </div>
    </>
  )
}

export default CourseAccess
