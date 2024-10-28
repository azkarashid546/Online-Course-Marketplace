import React, { useEffect, useState } from 'react'
import { useGetCourseContentQuery } from '../../redux/features/courses/coursesApi'
import Loader from '../Loader/Loader'
import CourseContentMedia from "./CourseContentMedia"
import CourseContentList from './CourseContentList'
import { useSelector } from 'react-redux'
const CourseContent = ({id, user}) => {
   console.log("course content",user)
    const {data, isLoading, refetch} = useGetCourseContentQuery(id, {refetchOnMountOrArgChange : true})
    console.log("data",data)
    const [activeVedio, setActiveVedio] = useState(0)
    const [pageTitle, setPageTitle] = useState("ELearning");
    const [keywords, setKeywords] = useState('')
    const [description, setDescription] = useState('')
    useEffect(() => {
        if (data) {
          setPageTitle(data?.content[activeVedio]?.title);
          setDescription("ELearning is a programming community which is devbeloped by Azka Rashid for helping programmers")
        //   setKeywords(data?.content[activeVedio]?.tags)
        } else {
          setPageTitle("ELearning");
        }
        document.title = pageTitle;
        document.description = description;
        // document.keywords = keywords;
   
      }, [pageTitle, description, keywords]);
  return (
    <>
      {
        isLoading ? (<Loader/>) :(
          <div className='row'>
          <div className="col-md-7">
         
            <CourseContentMedia
              data={data?.content}
              id={id}
              activeVedio={activeVedio}
              setActiveVedio={setActiveVedio}
              user={user}
              refetch={refetch}
            />
          </div>
          <div className="col-md-5">
           <CourseContentList
           activeVedio={activeVedio}
           setActiveVedio={setActiveVedio}
           data={data?.content}
         
           />
          </div>
        </div>
        
        )
      }
    </>
  )
}

export default CourseContent
