import React, { useEffect, useState } from "react";
import { useGetCourseDetailsQuery } from "../../redux/features/courses/coursesApi";
import Loader from "../../components/Loader/Loader";
import CourseDetails from "../../components/Course/CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "../../redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
const CourseDetailsPage = ({ id }) => {
  const {error, data:users} = useLoadUserQuery(undefined, {})
  const [route, setRoute] = useState("/login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState([]);
  const [clientSecret, setClientSecret] = useState("");

  console.log("config", config);
  console.log("bla bla", paymentIntentData);
  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data?.course.price * 100);
      // const courseId = data?.course._id

      createPaymentIntent(amount);
    }
  }, [config, data]);

  console.log(data);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);
  const [pageTitle, setPageTitle] = useState("ELearning");
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (data?.course) {
      setPageTitle(`${data?.course.name} - ELearning`);
      setDescription(
        "ELearning is a programming community which is devbeloped by Azka Rashid for helping programmers"
      );
      setKeywords(data?.course.tags);
    } else {
      setPageTitle("ELearning");
    }
    document.title = pageTitle;
    document.description = description;
    document.keywords = keywords;
    console.log(pageTitle);
  }, [pageTitle, description, keywords]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {stripePromise && (
            <CourseDetails
              data={data}
              open={open}
              setOpen={setOpen}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              users={users}
            />
          )}
        </>
      )}
    </>
  );
};

export default CourseDetailsPage;
