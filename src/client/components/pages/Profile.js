import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({});
  const userState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userState.loggedIn) {
      setUser(userState.user);
    } else {
      navigate("/login");
    }
  });

  return (
    <>
      <p>{JSON.stringify(user)}</p>
    </>
  );
}
