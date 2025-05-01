import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "./components/ui/sonner";
import { useLoadUserQuery } from "./features/api/authApi";
import LoadingSpinner from "./components/LoadingSpinner";
import { userLoggedIn } from "./features/authSlice";
import { useDispatch } from "react-redux";
import CustomWrapper from "./components/CustomWrapper";
import { useEffect } from 'react';


const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={appStore}>
      <CustomWrapper>
        <App />
        <Toaster />
      </CustomWrapper>
    </Provider>
  </StrictMode>
);