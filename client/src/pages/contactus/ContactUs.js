import React, { useEffect, useState } from "react";
import { useCreateContactUsMutation } from "../../redux/features/conatctus/conatctusApi"; // Correct import
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const [createContactUs, { isSuccess, error }] = useCreateContactUsMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    
      await createContactUs(formData).unwrap();
    //   if (isSuccess) {
    //     toast.success("Message sent successfully!");

    //     setFormData({
    //       firstName: "",
    //       lastName: "",
    //       email: "",
    //       phone: "",
    //       country: "",
    //       message: "",
    //     });
    //   }
    // } catch (err) {
    //   if (error) {
    //     toast.error("Failed to send message. Please try again.");
    //   }
    // }
  };

  useEffect(()=> {
    if (isSuccess) {
          toast.success("Message sent successfully!");
  
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            country: "",
            message: "",
          });
        }
        if (error) {
              toast.error("Failed to send message. Please try again.");
            }
  }, [isSuccess , error])

  return (
    <>
      <main>
        <Toaster />
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-md-6">
              <div className="row row-cols-md-2 g-4">
                <div
                  className="aos-item"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="aos-item__inner">
                    <div className="hvr-shutter-out-horizontal d-block p-3">
                      <div className="d-flex justify-content-start">
                        <i className="fa-solid fa-envelope h3 pe-2 text-primary"></i>
                        <span className="h5">Email</span>
                      </div>
                      <span>azkarashid196@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div
                  className="aos-item"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="aos-item__inner">
                    <div className="hvr-shutter-out-horizontal d-block p-3">
                      <div className="d-flex justify-content-start">
                        <i className="fa-solid fa-phone h3 pe-2 text-primary"></i>
                        <span className="h5">Phone</span>
                      </div>
                      <span>+923055358098</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="aos-item mt-4"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="aos-item__inner">
                  <div className="hvr-shutter-out-horizontal d-block p-3">
                    <div className="d-flex justify-content-start">
                      <i className="fa-solid fa-location-pin h3 pe-2 text-primary"></i>
                      <span className="h5">Office Location</span>
                    </div>
                    <span>Lalazar Canal View House # 312</span>
                  </div>
                </div>
              </div>
              <div
                className="aos-item mt-4"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="w-100 aos-item__inner">
                  <iframe
                    className="hvr-shadow"
                    width="100%"
                    height="345"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/distance-area-calculator.html">
                      measure acres/hectares on map
                    </a>
                  </iframe>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <h2 className="pb-4">Leave a Message</h2>
              <div className="row g-4">
                <div className="col-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-transparent text-white"
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-transparent text-white"
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent text-white"
                  id="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control bg-transparent text-white"
                  id="phone"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  className="form-select bg-transparent select-dark-options"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="USA">USA</option>
                  <option value="Non-USA">Non-USA</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control bg-transparent text-white"
                  id="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactUs;
