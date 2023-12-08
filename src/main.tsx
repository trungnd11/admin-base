import React from "react";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import store from "./store/index.ts";
import { bindActionCreators } from "@reduxjs/toolkit";
import AxiosInterceptor from "./config/AxiosInterceptor.ts";
import { clearAuthentication } from "./store/auth/auth.ts";
import { ConfigProvider } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";
import { MainColor } from "./component/variable.ts";
import { GlobalStyle } from "./component/commonStyle/CommonStyle.ts";

const action = bindActionCreators({ clearAuthentication }, store.dispatch);
AxiosInterceptor(() => {
  action.clearAuthentication();
});

const config: ThemeConfig = {
  token: {
    colorPrimary: MainColor,
    colorPrimaryText: MainColor,
    colorLink: MainColor,
    colorLinkHover: "#1eb361",
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider theme={config}>
          <App />
          <GlobalStyle />
        </ConfigProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
