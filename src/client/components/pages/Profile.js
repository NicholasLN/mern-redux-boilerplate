import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import { logout } from "../../redux/reducers/authSlice";
import Body from "../struct/Body";

export default function Profile() {
  const [user, setUser] = useState({});
  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);

  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutState = () => {
    dispatch(logout());
    removeCookie("access_token");
    navigate("/login");
  };

  useEffect(() => {
    if (userState.loggedIn) {
      setUser(userState.user);
    } else {
      navigate("/login");
    }
  });

  return (
    <Body>
      <p>{JSON.stringify(user)}</p>
      <button className="text-blue-400" onClick={logoutState}>
        Logout
      </button>
    </Body>
  );
}
