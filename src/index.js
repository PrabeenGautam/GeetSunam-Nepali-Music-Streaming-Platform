import React, { useLayoutEffect, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Flip, ToastContainer } from "react-toastify";

import App from "App";
import "./index.css";
import "styles/common.css";
import "styles/keyframes.css";
import "react-toastify/dist/ReactToastify.css";

import { queryClient } from "services/queryClient";
import geetSunamStore from "redux/store";
import geetSunamStoreContext from "redux/storeContext";
import playerStore from "react-mui-player/redux/store";
import LoginPage from "pages/auth/Login.page";
import SignUpPage from "pages/auth/SignUp.page";
import "./components/i18n";

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
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
        >
          <BrowserRouter>
            <Suspense fallback={"Loading..."}>
              <ScrollToTop>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  transition={Flip}
                  pauseOnHover
                  theme="dark"
                />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/*" element={<App />} />
                </Routes>
              </ScrollToTop>
            </Suspense>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  </Provider>
);
