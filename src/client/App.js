import React, { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import getPage from "./utils/getPage";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { login, logout, updateState } from "./redux/reducers/authSlice";

export default function App() {
  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);

  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  var checkCookie = (function () {
    var lastCookie = document.cookie; // 'static' memory between function calls
    return function () {
      var currentCookie = document.cookie;
      if (currentCookie != lastCookie) {
        console.error(`Access token has been modified.`);
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
          if (!userState.loggedIn) {
            dispatch(login(user.data));
          } else {
            dispatch(updateState(user.data));
          }
        } catch (e) {
          console.log(e);
          removeCookie("access_token");
          dispatch(logout());
        }
      }
      setLoading(false);
    }
    fetchProfile();
    const i = setInterval(() => {
      checkCookie();
      fetchProfile();
    }, 10000);
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
