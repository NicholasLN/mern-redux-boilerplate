import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import postPage from "../../utils/postPage";
import { login } from "../../redux/reducers/authSlice";
import Body from "../struct/Body";

export default function Login() {
  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (userState.loggedIn) {
      navigate("/profile");
    }
  }, []);
  const loginSubmit = async () => {
    var res = await postPage("/api/v1/user/login", {
      username,
      password,
      rememberMe: false,
    });
    if (res.status == 200) {
      setCookie("access_token", res.data.accessToken, {
        secure: process.env.SECURE == false ? true : false,
        sameSite: "lax",
      });
      dispatch(login(res.data.user));
      navigate("/profile");
    }
  };
  return (
    <Body>
      <p>username</p>
      <input
        id="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      <p>password</p>
      <input
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button className="text-blue-400" onClick={loginSubmit}>
        login
      </button>
    </Body>
  );
}
