import React, { useContext, useEffect } from "react";
import { ProductCart } from "../Context/OveralProvider";
import CheckoutBtn from "../components/CheckoutBtn";
import { useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const CartPage = () => {
  const {
    cartItems,
    setCartItems,
    handleQuantity,
    calculateTotalPrice,
    removeItem,
    cartSubtotal,
    finalTotal,
  } = useContext(ProductCart);

  const { auth } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const clearCart = async () => {
      if (auth?.name) {
        if (searchParams.get("cancel") === "true") {
          toast.error("order canceled", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    };

    clearCart();
  }, [searchParams]);

  return (
    <div className="wrapper-div">
      <div className="cartContent">
        <div className="contentHeader">
          <div className="titleName">Product</div>
          <div className="titleQuantity">Quantity</div>
          <div className="titleSubtotal">Subtotal</div>
        </div>
        <div className="cartItems">
          {cartItems &&
            cartItems?.map((item, index) => (
              <div className="item" key={index}>
                <div className="itemProduct">
                  <div className="itemImg">
                    <img
                      src={`${import.meta.env.VITE_APIURL}/images/${item.imgUrl}`}
                      alt=""
                    />
                  </div>
                  <div className="itemImgDetails">
                    <p className="cName">Name: {item.productName}</p>
                    <p className="cPrice">
                      <span className="cpLabel">Price:</span> ${item.price}
                    </p>
                    <p className="vari">
                      <span className="cvLabel">Variation: </span>
                      {item.variation}
                    </p>
                    <p className="del" onClick={() => removeItem(item)}>
                      remove
                    </p>
                  </div>
                </div>
                <input
                  className="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantity(item, e)}
                  min="1"
                ></input>
                <div className="subtotal">${calculateTotalPrice(item)}</div>
              </div>
            ))}
        </div>
        <div className="cartTotal">
          <div className="Sbt">
            <p className="sbtTitle">Subtotal</p>
            <p className="sbtValue">${cartSubtotal ? cartSubtotal : 0}</p>
          </div>
          <div className="Tax">
            <p className="tax">Shipping and Handling</p>
            <p className="taxValue">
              ${cartItems && cartItems.length > 0 ? 10 : 0}
            </p>
          </div>
          <div className="Total">
            <p className="ttlTitle">Total</p>
            <p className="ttlValue">${finalTotal ? finalTotal : 0}</p>
          </div>
        </div>
        <CheckoutBtn cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
};

export default CartPage;
