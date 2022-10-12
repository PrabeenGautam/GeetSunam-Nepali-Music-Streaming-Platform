import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "App";
import "./index.css";
import "styles/common.css";
import "styles/keyframes.css";

import { queryClient } from "services/queryClient";
import geetSunamStore from "redux/store";
import geetSunamStoreContext from "redux/storeContext";
import playerStore from "react-mui-player/redux/store";
import LoginPage from "pages/auth/Login.page";
import SignUpPage from "pages/auth/SignUp.page";

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={playerStore}>
    <Provider store={geetSunamStore} context={geetSunamStoreContext}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="529881800719-0kd1fqipp0vhpoci34cnpqlpghnn2msk.apps.googleusercontent.com">
          <BrowserRouter>
            <ScrollToTop>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/*" element={<App />} />
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  </Provider>
);
