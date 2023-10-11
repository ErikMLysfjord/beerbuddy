import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App.tsx";
import { ConfigProvider, theme } from "antd";
import { App as AntdApp } from "antd";
import "./index.css";
import LogInPage from "./pages/LogIn.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          /* If we wish to change color */
          /* colorPrimary: "#FFCC48", */
          colorPrimary: "#B1C155",
          borderRadius: 5,
          colorPrimaryBg: "#1f1f1f",
          colorError: "#fe6b6b",
        },
        algorithm: theme.darkAlgorithm,
      }}>
      <AntdApp>
        <BrowserRouter basename="/project2">
          <Routes>
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<LogInPage />} />
            <Route path="/" element={<App />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>
);
