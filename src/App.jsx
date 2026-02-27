import { RouterProvider } from "react-router-dom";
import { createRouter } from "./router";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const checkLogin = async () => {
    try {
      await axios.post(`${API_BASE}/api/user/check`);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      console.error("驗證失敗", error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    setIsAuthLoading(true);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];

    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      checkLogin();
    } else {
      setIsAuthLoading(false);
    }
  }, []);

  if (isAuthLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 根據當前驗證狀態建立路由實例
  const router = createRouter(isAuth, setIsAuth);

  return <RouterProvider router={router} />;
}

export default App;
