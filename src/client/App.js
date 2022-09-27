import React, { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { login, logout, updateState } from "./redux/reducers/authSlice";
import { BeatLoader } from "react-spinners";

import router from "./router";
import getPage from "./utils/getPage";

export default function App() {
  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);

  const userState = useSelector((state) => state.auth);
  const isFocused = useSelector((state) => state.windowFocus.focus);

  const dispatch = useDispatch();

  var checkCookie = (function () {
    var lastCookie = document.cookie;
    return function () {
      var currentCookie = document.cookie;
      if (currentCookie != lastCookie) {
        console.error(`Access token has been modified.`);
        // Destroy cookie if it has been modified in any sort of way or destroyed.
        removeCookie("access_token");
        dispatch(logout());
        lastCookie = currentCookie;
      }
    };
  })();

  // useEffect to restore login state
  useEffect(() => {
    async function fetchProfile() {
      if (cookie.access_token) {
        // Only fetch profile if the user is actively looking at the screen.
        if (isFocused) {
          try {
            var user = await getPage(
              "/api/v1/user/profile",
              cookie.access_token
            );
            if (!userState.loggedIn) {
              dispatch(login(user.data));
            } else {
              dispatch(updateState(user.data));
            }
          } catch (e) {
            removeCookie("access_token");
            dispatch(logout());
          }
          try {
            var user = await getPage(
              "/api/v1/user/profile",
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
      }
      setLoading(false);
    }
    fetchProfile();

    // Every n x 10000 seconds, check if cookie has been altered and fetch new user data (if they are focused)
    const i = setInterval(() => {
      checkCookie();
      fetchProfile();
    }, 10000);

    return () => {
      clearInterval(i);
    };
  }, [isFocused]);

  if (!loading) {
    return (
      <>
        <RouterProvider router={router} fallbackElement={<h1>Loading</h1>} />
      </>
    );
  } else {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-2xl">AUTHORITY do be loading tho..</h1>
        <BeatLoader size={10} />
      </div>
    );
  }
}
