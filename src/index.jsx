import React, { useLayoutEffect, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Flip, ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import App from "@/App";
import "./index.css";
import "@/styles/common.css";
import "@/styles/keyframes.css";
import "react-toastify/dist/ReactToastify.css";
import "./responsive.css";

import geetSunamStore from "@/redux/store";
import geetSunamStoreContext from "@/redux/storeContext";
import playerStore from "@/react-mui-player/redux/store";
import LoginPage from "@/pages/auth/Login.page";
import SignUpPage from "@/pages/auth/SignUp.page";
import Loading from "@/components/Loading";
import "@/components/i18n";
import VerifyTokenRoutes from "./pages/VerifyTokenRoutes";
import LandingPage from "./pages/landing/Landing";

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={playerStore}>
      <Provider store={geetSunamStore} context={geetSunamStoreContext}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
          <BrowserRouter basename={import.meta.env.VITE_BASE_URL || "/"}>
            <Suspense fallback={<Loading />}>
              <ScrollToTop>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  transition={Flip}
                  pauseOnHover
                  theme="dark"
                />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login/verify" element={<VerifyTokenRoutes />} />
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/*" element={<App />} />
                </Routes>
              </ScrollToTop>
            </Suspense>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </Provider>
    {/* <ReactQueryDevtools initialIsOpen={false} position="top-right" /> */}
  </QueryClientProvider>
);
