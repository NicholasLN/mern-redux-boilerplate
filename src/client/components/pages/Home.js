import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const userState = useSelector((user) => user.auth);
  return (
    <>
      <h1>Home</h1>
      {!userState.loggedIn ? (
        <>
          <Link to="/login">Login Page</Link>
          <br />
          <Link to="/register">Register Page</Link>
        </>
      ) : (
        <Link to="/profile">Profile</Link>
      )}
    </>
  );
}
