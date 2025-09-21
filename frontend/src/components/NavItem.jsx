import React, { useContext, useEffect, useState } from "react";
import cartIcon from "/images/cart-arrow-down.png";
import MenuIcon from "/images/Menu.png";
import CloseIcon from "/images/close-btn.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductCart } from "../Context/OveralProvider";
import { AuthContext } from "../Context/Authentication";
import useAuth from "../hooks/useAuth";
import axios from "../axiosApi/axios";

const NavItem = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartNumber, cartItems } = useContext(ProductCart);
  const location = useLocation();
  const [menuActive, setMenuActive] = useState("");
  
  // Use auth context
  const { auth, setAuth, getUser, isLoading, setLoading } = useAuth();
  
  const navigate = useNavigate();

  // Set initial menu active state based on current location
  useEffect(() => {
  const selectMenuActive = () => {
    if (location.pathname === "/") {
      setMenuActive("/");
    } else if (location.pathname === "/shop") {
      setMenuActive("/shop");
    } else if (location.pathname === "/orderPage") {
      setMenuActive("/orderPage");
    } else {
      setMenuActive("");
    }
  };

  selectMenuActive();

  // Check token only once on mount/refresh
  const token = localStorage.getItem("auth_token");
  if (token && !auth?.name) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getUser();
  }
}, [location.pathname]); 


  const handleScroll = (activeName) => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setMenuActive(activeName);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      
      // Get token from localStorage
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        // Set token in headers for logout request
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          // Call logout endpoint
          await axios.post("/logout");
        } catch (logoutError) {
          console.error("Logout API error:", logoutError);
          // Continue with local cleanup even if API fails
        }
      }
      
      // Always clear local storage and state
      localStorage.removeItem('auth_token');
      delete axios.defaults.headers.common['Authorization'];
      
      // Clear auth state
      setAuth({});
      
      // Navigate to home page
      navigate("/", { replace: true });
      
      // Close mobile menu if open
      setMenuOpen(false);
      
    } catch (err) {
      console.error("Logout error:", err);
      
      // Even if there's an error, clear local state
      localStorage.removeItem('auth_token');
      delete axios.defaults.headers.common['Authorization'];
      setAuth({});
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Check if user is authenticated
  const isAuthenticated = auth && auth.name && localStorage.getItem('auth_token');

  return (
    <div className="wrapper-nav-div">
      <div id="logo-nav-div">
        <Link
          to="/"
          onClick={() => handleScroll("/")}
          style={{ textDecoration: "none" }}
          className="logo"
        >
          LOGO
        </Link>
        
        <div id="nav-icons">
          <nav>
            <div id="navLinks" className={menuOpen ? "activeNavLink" : ""}>
              <Link
                onClick={() => handleScroll("/")}
                to="/"
                className={`nav-item ${
                  menuActive === "/" ? "active" : ""
                } navLink`}
              >
                Home
              </Link>
              
              <Link
                onClick={() => handleScroll("/shop")}
                to="/shop"
                className={`nav-item ${
                  menuActive === "/shop" ? "active" : ""
                } navLink`}
              >
                Shop
              </Link>
              
              {/* Only show Orders link if user is authenticated */}
              {isAuthenticated && (
                <Link
                  onClick={() => handleScroll("/orderPage")}
                  to="/orderPage"
                  className={`nav-item ${
                    menuActive === "/orderPage" ? "active" : ""
                  } navLink`}
                >
                  Orders
                </Link>
              )}
            </div>
            
            {/* Authentication section */}
            {isLoading ? (
              <div className="nameLogout">
                <p className="logoutCart">Loading...</p>
              </div>
            ) : isAuthenticated ? (
              <div className="nameLogout">
                <p className="logoutCart">Welcome {auth.name}</p>
                <p 
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                  className="logout-btn"
                >
                  Logout
                </p>
              </div>
            ) : (
              <>
                <Link
                  to="/sign-up"
                  onClick={closeMenu}
                  className="nav-item signUp"
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="nav-item login"
                >
                  Login
                </Link>
              </>
            )}
            
            {/* Cart section */}
            <div
              className="nav-icon"
              id={`${isAuthenticated ? "cartBtn" : "cartBtnLogout"}`}
            >
              <Link to="/cart" onClick={closeMenu}>
                <img src={cartIcon} alt="Cart" />
              </Link>
              <span className={`${isAuthenticated ? "num" : "numLogout"}`}>
                {cartItems ? cartNumber : 0}
              </span>
            </div>
            
            {/* Mobile menu button */}
            <div id="menuBtn" onClick={handleMenuToggle}>
              <img 
                src={menuOpen ? CloseIcon : MenuIcon} 
                alt={menuOpen ? "Close Menu" : "Open Menu"} 
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavItem;
