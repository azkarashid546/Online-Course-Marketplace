import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../redux/features/auth/authApi";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading, isSuccess, error, data }] =
    useRegisterMutation();

  let navigate = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string()
      .email("Invalid Email")
      .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
    role: Yup.string().required("Please select a role!"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", role: "user" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, role }) => {
      await register({
        name,
        email,
        password,
        role,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registeration Successfull!";
      toast.success(message);
      navigate("/verification");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, error]);
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
            <h1 className="text-white text-center p-3">Join to ELearning</h1>
            <div className="mb-3">
              <label className="form-label text-white">Select a role</label>
              <div className="form-check">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  onChange={handleChange}
                  checked={values.role === "user"}
                />
                <label className="form-check-label text-white mx-2">User</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  onChange={handleChange}
                  checked={values.role === "instructor"}
                />
                <label className="form-check-label text-white mx-2">
                  Instructor
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-white">
                Name
              </label>
              <input
                type={`form-control ${
                  errors.name && touched.name ? "border-danger" : ""
                }`}
                className="form-control text-white"
                id="name"
                name="name"
                onChange={handleChange}
                value={values.name}
                style={{ outline: "none", background : "#303538" }}
              />
              {errors.name && touched.name && (
                <span className="pt-2" style={{ color: "red" }}>
                  {errors.name}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">
                Email address
              </label>
              <input
                type="email"
                className={`form-control text-white ${
                  errors.email && touched.email ? "border-danger" : ""
                }`}
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                style={{ outline: "none", background : "transparent" }}
              />
              {errors.email && touched.email && (
                <span className="pt-2 block" style={{ color: "red" }}>
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
                  className={`form-control text-white ${
                    errors.password && touched.password ? "border-danger" : ""
                  }`}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  style={{ outline: "none" , backgroundColor : "#303538"}}
                />
                {showPassword ? (
                  <i
                    class="fa-solid fa-eye fa-xl p-2"
                    onClick={togglePasswordVisibility}
                  ></i>
                ) : (
                  <i
                    class="fa-solid fa-eye-slash fa-xl p-2"
                    onClick={togglePasswordVisibility}
                  ></i>
                )}
              </div>
              {errors.password && touched.password && (
                <span className="pt-2 block" style={{ color: "red" }}>
                  {errors.password}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ borderRadius: "50px" }}
            >
              Sign up
            </button>
            <p className="text-white my-5 text-center">
              Already have an account <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
