import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import postPage from "../../utils/postPage";
import { login } from "../../redux/reducers/authSlice";

export default function Register() {
  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (userState.loggedIn) {
      navigate("/profile");
    }
  }, []);
  const registerSubmit = async () => {
    // TODO: user input verification
    var res = await postPage("/api/v1/user/userActions/register", {
      username,
      password,
      email,
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
    <>
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
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <p>email</p>
      <input
        id="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <button onClick={registerSubmit}>register</button>
    </>
  );
}
