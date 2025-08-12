import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserAuth } from "../api/auth";

export default function ProtectedRoute({ children }) {
  const [isAuth, setisAuth] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getUserAuth();
        if (res.status === 200) {
          setisAuth(true); // ✅ Authenticated
        } else {
          setisAuth(false); // ❌ Not authenticated
        }
      } catch (err) {
        setisAuth(false); // ❌ If request fails
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <p>Loading...</p>; // ⏳ Wait until API returns
  }
  return isAuth ? children : <Navigate to="/signup" replace />;
}
