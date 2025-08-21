import React, { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Navigate, useSearchParams } from "react-router-dom";
import { ProductCart } from "../Context/OveralProvider";
import axios from "../axiosApi/axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Orders = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();
  const [orderItems, setOrderItems] = useState();
  const [updateOrder, setUpdateOrder] = useState(false);
  const { setCartItems } = useContext(ProductCart);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clearCarts = async () => {
      if (searchParams.get("success") === "true") {
        try {
          // await axios.get("/cart/clearCart");
          // toast.success("order created", {
          //   position: "top-center",
          //   autoClose: 2000,
          // });
          // setOrderItems(true)
          localStorage.removeItem("cart");
          // setOrderItems(false)
          setCartItems([]);
        } catch (error) {
          console.log(error);
        }
      }
    };

    clearCarts();
  }, [searchParams]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        // setLoading(true);
        const res = await axios.get(`/api/orders/${auth.id}`);
        setLoading(false);
        setOrderItems(res?.data);
        console.log(res?.data);
        console.log("running");
        // setUpdateOrder(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    };
    getOrders();

    setUpdateOrder(false);
  }, [updateOrder, auth,]);

  // useEffect(() => {
  //   const getOrderss = async () => {
  //     const res = await axios.get("/api/webHookData");
  //     // setOrderItems(res?.data?.orderData);
  //     // setUpdateOrder(false);
  //     console.log(res)
  //   };
  //   getOrderss();
  // }, [updateOrder]);

  // webHookData

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      const res = await axios.delete(`/api/order/${id}?userId=${auth.id}`);
      setUpdateOrder(true);
      toast.error("item deleted", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // if (loading) {
  //   return (
  //     <div>
  //       <div className="loading">
  //         <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="wrapper-div">
      {loading ? (
        <div>
          <div className="loading">
            <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="" />
          </div>
        </div>
      ) : (
        <div className="orderContainer">
          <h1 className="orderH1">Your Orders</h1>
          {orderItems?.length > 0 ? (
            orderItems?.map((order) => (
              <div className="order" key={order.id}>
                <p className="orderDate">
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#F1510F",
                    }}
                  >
                    Order date:{" "}
                  </span>
                  {order.created_at}
                </p>

                <div className="orderInfoBox">
                  {order?.order_items?.map((item) => (
                    <div className="orderInfo" key={item.id}>
                      <div className="orderImg">
                        <img
                          src={`${import.meta.env.VITE_APIURL}/images/${
                            item.imgUrl
                          }`}
                          alt=""
                        />
                      </div>
                      <div className="orderDetails">
                        <p>{item.productName}</p>
                        <p>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: "bold",
                              color: "#f1530f85",
                            }}
                          >
                            Variation:{" "}
                          </span>{" "}
                          {item.variationName}
                        </p>
                        <p>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: "bold",
                              color: "#f1530f85",
                            }}
                          >
                            Qty:{" "}
                          </span>
                          {item.quantity}
                        </p>
                        <p>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: "bold",
                              color: "#f1530f85",
                            }}
                          >
                            price:{" "}
                          </span>
                          ${item.price}
                        </p>
                        <p>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: "bold",
                              color: "#f1530f85",
                            }}
                          >
                            Item Subtotal:{" "}
                          </span>
                          ${item.quantity * item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="orderTtl">
                  <p>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#f1530f85",
                      }}
                    >
                      SubTotal:{" "}
                    </span>
                    ${order.subtotal / 100}
                  </p>
                  <p>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#f1530f85",
                      }}
                    >
                      Total:{" "}
                    </span>
                    ${order.total / 100}
                  </p>
                  <button
                    type="submit"
                    className="orderDelBtn"
                    onClick={(e) => handleDelete(e, order.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))
          ) : <h1>No Orders</h1>}
        </div>
      )}
    </div>
  );
};

export default Orders;
