import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import axios from "../axiosApi/axios";
import {v4 as uuidv4} from "uuid"

const CheckoutBtn = ({ cartItems, setCartItems }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      let idempotencyKey = localStorage.getItem("payment_idempotencyKey");

      if(!idempotencyKey){
        idempotencyKey = uuidv4();
        localStorage.setItem("payment_idempotencyKey", JSON.stringify(idempotencyKey));
      }
      // let idempotencyKey = uuidv4();

      const res = await axios.post(
        "/api/checkout",
        JSON.stringify({ cartItems, userId: auth?.id }),
        {
          headers: {
            "Idempotency-Key": idempotencyKey,
          },
        }
      );
      if(res?.data?.url){
        window.location.href = res.data.url
      }

      localStorage.removeItem("payment_idempotencyKey")

      console.log(res);
    } catch (err) {
      console.log(err.error);
    }
  };
  return (
    <form className="cartContent">
      {auth.name ? (
        <button
          onClick={handleCheckout}
          type="button"
          className="checkout"
          style={{ cursor: "pointer", borderColor: "#F1510F" }}
        >
          Proceed To Checkout
        </button>
      ) : (
        <Link className="cartContent" to={"/login"}>
          <button
            type="button"
            className="checkout"
            style={{ cursor: "pointer", borderColor: "#F1510F" }}
          >
            Login To Checkout
          </button>
        </Link>
      )}
    </form>
  );
};

export default CheckoutBtn;
