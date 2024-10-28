import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function AdminProtected({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const isInstructor = user?.role === "instructor";


  useEffect(() => {
    if (!isInstructor) {
      navigate('/');
    }
  }, [isInstructor]);

  if (isInstructor) {
    return children;
  }

  return null;
}