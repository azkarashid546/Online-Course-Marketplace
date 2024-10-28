import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import socketIO from "socket.io-client";

const CheckOutForm = ({ setOpen, data, user }) => {
  const ENDPOINT = "http://localhost:5000" || "";
  const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
  console.log(data?.course?._id);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data?.course?._id, payment_info: paymentIntent });
    }
  };
  useEffect(() => {
    if (orderData) {
      setLoadUser(false);
      socketId.emit("notification", {
        title : "New Order",
        message : `You have a new order from ${data.course.name}`,
        userId : user._id
      })
      navigate(`/course-access/${data?.course?._id}`);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [orderData, error, navigate, data?.course?._id]);

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="mt-4 text-white bg-primary px-3"
          style={{ height: "35px", borderRadius: "50px", border: "none" }}
        >
          <span id="button-text">{isLoading ? "Paying..." : "Pay now"}</span>
        </button>

        {message && (
          <div id="payment-message" className="text-red-500 pt-2">
            {message}
          </div>
        )}
      </form>
    </>
  );
};

export default CheckOutForm;
