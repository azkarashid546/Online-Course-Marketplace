import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useSelector } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.auth.user);
  let navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
  });

  
  const [login, {isSuccess, error}]= useLoginMutation()
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
       await login({email, password})
    
    },
  });


  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/profile");
      }
    }
    if(error){
      toast.error(error.data.message)
    }
  
  }, [isSuccess, error])

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="login-form">
        <div className="login-form-center">
          <Toaster />
          <form onSubmit={handleSubmit}>
            <h1 className="text-white text-center p-3">Login With ELearning</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">
                Email address
              </label>
              <input
                type="email"
                className={`form-control  text-white ${errors.email && touched.email ? 'border-danger' : ''}`}
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                style = {{outline : "none", background : "transparent"}}
              />
               {errors.email && touched.email && (
                <span className="pt-2 block" style={{color : "red"}}>
                  {errors.email}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">
                Password
              </label>
              <div className="d-flex password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control text-white ${errors.password && touched.password ? 'border-danger-2' : ''}`}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  style = {{outline : "none", backgroundColor : "#33383C"}}
                />
                {showPassword ? (
                  <i
                  style={{color : "gray"}}
                    className="fa-solid fa-eye fa-xl p-2"
                    onClick={togglePasswordVisibility}
                  ></i>
                ) : (
                  <i
                  style={{color : "gray"}}
                    className="fa-solid fa-eye-slash fa-xl p-2"
                    onClick={togglePasswordVisibility}
                  ></i>
                )}
             
              </div>
              {errors.password && touched.password && (
                <span className="pt-2 block" style={{color : "red"}}>
                  {errors.password}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ borderRadius: "50px" }}
            >
              Login
            </button>
            <p className="text-white my-5 text-center">
              Not have any account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
