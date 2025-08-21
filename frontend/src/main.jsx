import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import OveralProvider from "./Context/OveralProvider.jsx";
import Authentication from "./Context/Authentication.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Authentication>
        <OveralProvider>
          <Routes>
            <Route path="/*" element={<App />}/>
          </Routes>
        </OveralProvider>
      </Authentication>
    </BrowserRouter>
  </StrictMode>
);
