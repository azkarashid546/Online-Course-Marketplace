import logo from "./logo.svg";
import react, { useState, useEffect } from "react";
import "./App.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/chatgpt.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Home/Header";
import Home from "./pages/home/index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verification from "./pages/Verification";
import axios from "axios";
import { Providers } from "./Provider";
import Profile from "./pages/Profile/Profile";
import Protected from "./hooks/useProtected";
import ChangePassword from "./pages/Profile/ChangePassword";
import BasicLayout from "./components/Home/BasicLayout";
import ProfileInfo from "./pages/Profile/ProfileInfo";
import Admin from "./pages/admin/Admin";

import AdminProtected from "./hooks/adminProtected";
import InstructorProtected from "./hooks/instructorProtected";
import CreateCourses from "./pages/admin/create-courses/CreateCourses";
import AllCourses from "./pages/admin/courses/AllCourses";
import Users from "./pages/admin/users/Users";
import Team from "./pages/admin/team/Team";
import EditCourse from "./pages/admin/edit-course/EditCourse";
import EditHero from "./pages/admin/hero/EditHero";
import EditFaq from "./pages/admin/faq/EditFaq";
import EditCategories from "./pages/admin/categories/EditCategories";
import CoursesAnalytics from "./pages/admin/courses-analytics/CoursesAnalytics";
import UsersAnalytics from "./pages/admin/users-analytics/UsersAnalytics";
import OrdersAnalytics from "./pages/admin/orders-analytics/OrdersAnalytics";
import DashboardWidgets from "./pages/admin/Widgets/DashboardWidgets";
import AllInvoices from "./pages/admin/Invoices/AllInvoices";
import Course from "./pages/course/Course";
import CourseAccess from "./pages/CourseAccess/CourseAccess";
import Courses from "./pages/Courses/Courses";
import useSocket from "./useSocket";
import About from "./pages/about/About";
import ContactUs from "./pages/contactus/ContactUs";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import AdminProfile from "./pages/admin/adminProfile/AdminProfile";
import ChangePasswordAdmin from "./pages/admin/changepassword/ChangePassword";
import EnrollUserCourses from "./pages/Profile/EnrollUserCourses";
import ViewCertifcates from "./pages/Profile/ViewCertifcates";
import { useSelector } from "react-redux";
import Instructor from "./pages/instructor/Instructor";
import UploadCertifcate from "./pages/admin/uploadCertifcate/UploadCertifcate";
import AdminAllCourses from "./pages/admin/AdminAllCourses/AdminAllCourses";
import AllInstructor from "./pages/admin/AllInstructor/AllInstructor";
import AllContacts from "./pages/admin/ContactDetails/AllContacts";
import Chatgpt from "./pages/chatgpt/Chatgpt";
function App() {
  useSocket();
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="background">
        <Router>
          <Routes>
            <Route path="/" element={<BasicLayout />}>
              <Route index element={<Home />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="instructor-course/:id" element={<CourseAccess />} />
              <Route path="admin-course/:id" element={<CourseAccess />} />
              <Route path="verification" element={<Verification />}></Route>
              <Route path="about" element={<About />} />
              <Route path="contactus" element={<ContactUs />} />
              <Route path="policy" element={<PrivacyPolicy />} />
              <Route path="course/:id" element={<Course />} />
              <Route path="chatgpt" element={<Chatgpt />} />
              <Route path="course-access/:id" element={<CourseAccess />} />
              <Route path="courses" element={<Courses />} />
            </Route>
            <Route
              path="/profile/*"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            >
              <Route index element={<ProfileInfo />}></Route>
              <Route
                path="change-password"
                element={<ChangePassword />}
              ></Route>
              <Route
                path="enrolled-courses"
                element={<EnrollUserCourses />}
              ></Route>
              <Route
                path="view-certifcates"
                element={<ViewCertifcates />}
              ></Route>
            </Route>

            <Route
              path="/admin/*"
              element={
                <AdminProtected>
                  <Admin />
                </AdminProtected>
              }
            >
              <Route index element={<DashboardWidgets isDashboard={true} />} />
              <Route path="profile" element={<AdminProfile />}></Route>
              <Route path="courses" element={<AdminAllCourses />} />
              <Route path="invoices" element={<AllInvoices />} />
              <Route path="contacts" element={<AllContacts />} />
              <Route path="users" element={<Users />} />
              <Route path="instructor" element={<AllInstructor />} />
              <Route path="manage-team" element={<Team />} />
              <Route path="edit-hero" element={<EditHero />} />
              <Route path="edit-faq" element={<EditFaq />} />
              <Route path="edit-categories" element={<EditCategories />} />
              <Route path="courses-analytics" element={<CoursesAnalytics />} />
              <Route path="users-analytics" element={<UsersAnalytics />} />
              <Route path="orders-analytics" element={<OrdersAnalytics />} />
              <Route path="change-password" element={<ChangePasswordAdmin />} />
            </Route>

            <Route
              path="/instructor/*"
              element={
                <InstructorProtected>
                  <Instructor />
                </InstructorProtected>
              }
            >
              <Route index element={<AdminProfile />}></Route>
              <Route path="create-courses" element={<CreateCourses />} />
              <Route path="all-courses" element={<AllCourses />} />
              <Route path="course/:id" element={<CourseAccess />} />
              <Route path="upload-certifcate" element={<UploadCertifcate />} />
              <Route path="manage-team" element={<Team />} />
              <Route path="edit-course/:id" element={<EditCourse />} />
              <Route path="edit-hero" element={<EditHero />} />
              <Route path="edit-faq" element={<EditFaq />} />
              <Route path="edit-categories" element={<EditCategories />} />
              <Route path="change-password" element={<ChangePasswordAdmin />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
