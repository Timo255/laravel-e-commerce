import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavItem from "./components/NavItem";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Home from "./home/home";
import Shop from "./shop/Shop";
import ProductCard from "./shop/ProductCard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CartPage from "./shop/CartPage";
import Missing from "./components/Missing";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PersistLogin from "./components/PersistLogin";
import Orders from "./components/Orders";
import ForgotPwd from "./components/ForgotPwd";
import ResetPwd from "./components/ResetPwd";

function App() {
  return (
    <>
      <NavItem />
      <div className="body-background">
        {/* <Outlet /> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:uuid" element={<ProductCard />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-pwd" element={<ForgotPwd />} />
            {/* Updated route to match your reset password URL */}
            <Route path="reset-password" element={<ResetPwd />} />

            {/* Persistent routes for authenticated features*/}
            <Route element={<PersistLogin />}>
              <Route path="cart" element={<CartPage />} />
              {/* Protected routes*/}
              <Route element={<PrivateRoute />}>
                <Route path="orderPage" element={<Orders />} />
              </Route>
            </Route>

            {/* <Route element={<PrivateRoute />}>
              <Route element={<PrivateRoute />}>
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route> */}

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
      <Footer />
      <div className="toast">
        <ToastContainer
          theme="colored"
          position="top-center"
          style={{ width: "100%" }}
        />
      </div>
    </>
  );
}

export default App;
