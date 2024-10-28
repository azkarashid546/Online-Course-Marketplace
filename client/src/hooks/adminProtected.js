import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function AdminProtected({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const isAdmin = user?.role === "admin";


  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin]);

  if (isAdmin) {
    return children;
  }

  return null;
}