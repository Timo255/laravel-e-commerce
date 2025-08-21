import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../axiosApi/axios";
import { toast } from "react-toastify";

export const ProductCart = createContext();

const OveralProvider = ({ children }) => {
  const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartItems, setCartItems] = useState(storedCartItems);
  const axiosPrivate = useAxiosPrivate();
  const [updateBasket, setUpdateBasket] = useState(false);
  const { auth } = useAuth();

  // useEffect(() => {
  //   let isMounted = true;
  //   // used to cancel the request if this component Unmount
  //   const controller = new AbortController();

  //   const getCartItems = async () => {
  //     try {
  //       const itemCart = await axios.get(`/cart`, {
  //         // enables to signal abort thats why we put the signal property in this request
  //         signal: controller.signal,
  //       });
  //       isMounted && setCartItems(itemCart?.data?.cartDetails?.items);
  //       setUpdateBasket(false);
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   };
  //   getCartItems();

  //   return () => {
  //     isMounted = false;

  //     // canceling the request when component Unmount
  //     controller.abort();
  //   };
  // }, [updateBasket, auth]);

  // add to cart

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async ({
    productName,
    price,
    variationName,
    quantity,
    imgUrl,
    productId,
    variationUuid,
  }) => {
    const product = {
      id: productId,
      imgUrl: imgUrl,
      name: productName,
      price: price,
      variation: variationName,
      quantity: quantity,
    };

    const existingProductIndex = cartItems.filter(
      (item) =>
        Number(item.id) === parseInt(product.id) &&
        item.variation === product.variation
    );

    if (!existingProductIndex.length) {
      try {
        setCartItems([...cartItems, product]);
        setUpdateBasket(true);
        toast.success("item added to cart", {
          position: "top-center",
          autoClose: 2000,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("item already in cart", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
  };

  // updateQuantity
  const handleQuantity = async (item, e) => {
    const quantity = parseInt(e.target.value);
    const productId = item?.productId;

    try {
      item.quantity = e.target.value;

      setCartItems([...cartItems]);
    } catch (err) {
      console.log(err);
    }
  };

  // single item subtotal calculation
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  // delete item
  const removeItem = async (item) => {
    // const productId = item.productId;
    try {
      const updatedCart = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );

      setCartItems(updatedCart);

      toast.error("item deleted", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // icon cartNumber
  const cartNumber =
    cartItems &&
    cartItems.reduce((total, item) => {
      return parseInt(total) + item.quantity;
    }, 0);

  // cart subtotal
  const cartSubtotal =
    cartItems &&
    cartItems.reduce((total, item) => {
      return total + calculateTotalPrice(item);
    }, 0);

  const shipping = cartItems && cartItems.length > 0 ? 10 : 0;
  const finalTotal = parseInt(cartSubtotal) + shipping;

  const contextValue = {
    cartItems,
    setCartItems,
    updateBasket,
    setUpdateBasket,
    addToCart,
    handleQuantity,
    calculateTotalPrice,
    removeItem,
    cartNumber,
    cartSubtotal,
    finalTotal,
  };
  return (
    <ProductCart.Provider value={contextValue}>{children}</ProductCart.Provider>
  );
};

export default OveralProvider;
