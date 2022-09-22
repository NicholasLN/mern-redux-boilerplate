import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import getPage from "./utils/getPage";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { login, logout } from "./redux/reducers/authSlice";

export default function App() {
  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);

  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  var checkCookie = (function () {
    var lastCookie = document.cookie;
    return function () {
      var currentCookie = document.cookie;
      if (currentCookie != lastCookie) {
        // something useful like parse cookie, run a callback fn, etc.
        removeCookie("access_token");
        dispatch(logout());
        lastCookie = currentCookie; // store latest cookie
      }
    };
  })();

  // useEffect to restore login state
  useEffect(() => {
    async function fetchProfile() {
      if (cookie.access_token) {
        try {
          var user = await getPage(
            "/api/v1/user/userInfo/profile",
            cookie.access_token
          );
          dispatch(login(user.data));
        } catch (e) {
          removeCookie("access_token");
          dispatch(logout());
        }
      }
      setLoading(false);
    }
    fetchProfile();

    // Periodicaclly run this function to make sure that the cookie has not been modified.
    const i = setInterval(() => {
      checkCookie();
    }, 5000);
    return () => {
      clearInterval(i);
    };
  }, [cookie.access_token]);

  if (!loading) {
    return (
      <>
        <RouterProvider router={router} fallbackElement={<h1>Loading</h1>} />
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
