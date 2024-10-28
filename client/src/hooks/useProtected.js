import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserAuth from './UserAuth';

export default function Protected({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = UserAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return children;
  }

  return null;
}
// connect.sid
// s%3AcV8_mbOJQ6SqBv5wa-yj0aQPk9lI4LEZ.NOc0UjbNfwQ8txHxIR6OrM%2B8qn68094WlTWuwosw1kI