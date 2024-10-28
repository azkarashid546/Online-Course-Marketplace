import React from 'react'

import { useParams } from 'react-router-dom'
import CourseDetailsPage from '../CourseDetails/CourseDetailsPage'
const Course = () => {
    const {id} = useParams()
  return (
    <>
      <div>
        <CourseDetailsPage id={id}/>
      </div>
    </>
  )
}

export default Course
