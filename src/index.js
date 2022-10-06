import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import App from "App";
import "./index.css";
import "styles/common.css";

import { queryClient } from "services/queryClient";
import geetSunamStore from "redux/store";
import geetSunamStoreContext from "redux/storeContext";
import playerStore from "react-mui-player/redux/store";

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
        <BrowserRouter>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </Provider>
);
