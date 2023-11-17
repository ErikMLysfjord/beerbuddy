import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App.tsx";
import { ConfigProvider, theme } from "antd";
import { App as AntdApp } from "antd";
import "./index.css";
import LogInPage from "./pages/LogIn.tsx";
import BeerPage from "./pages/Beer.tsx";
import { FilterContextProvider } from "./context/FilterContext.tsx";
import FallbackPage from "./pages/FallbackPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FilterContextProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FFCC48",
            borderRadius: 5,
            colorPrimaryBg: "#1f1f1f",
            colorError: "#fe6b6b",
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <AntdApp>
          <BrowserRouter basename="/project2">
            <Routes>
              <Route path="/login" element={<LogInPage />} />
              <Route path="/" element={<App />} />
              <Route path="/beer/:id" element={<BeerPage />} />
              <Route path="*" element={<FallbackPage />} />
            </Routes>
          </BrowserRouter>
        </AntdApp>
      </ConfigProvider>
    </FilterContextProvider>
  </React.StrictMode>
);
