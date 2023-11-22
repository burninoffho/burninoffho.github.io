import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "../sharabelComponent/Checkout";
import axios from "axios";

export default function Payment() {
  const { id } = useParams();

  const [toy, setToy] = useState({});
  const stripePromise = loadStripe(
    "YOU STRIPE TEST KEY"
  );

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://health-services-server-iota.vercel.app/orders/${appointmentID}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setUserInfo(res.data);
  //     });
  // }, [appointmentID]);
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/v1/toys/single-toys/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setToy(data?.data);
        });
    }
  }, [id]);

  const [p, setP] = useState(0);

  useEffect(() => {
    const storedPrice = localStorage.getItem("price");

    setP(Number(storedPrice));
  }, []);

  return (
    <div
      style={{
        // marginTop: "150px",
        paddingTop: "150px",
        paddingBottom: "100px",
      }}
    >
      <h5
        style={{
          textAlign: "center",
        }}
      >
        Pay for Toys
      </h5>
      <h5
        style={{
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        You will be paid : ${p}
      </h5>

      {/* -------------!stripe starts--------------- */}

      {toy?._id && (
        <Elements stripe={stripePromise}>
          <CheckOut id={id} />
        </Elements>
      )}

      {/* --------------!stripe ends---------------- */}
    </div>
  );
}
