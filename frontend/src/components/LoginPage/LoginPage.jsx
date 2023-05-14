import React, { useState } from "react";
import style from "./LoginPage.module.scss";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userSlice";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const { token } = useSelector((state) => state.userSlice);

  if (token) return <Navigate to="/account/user" />;

  const LoginHandler = async (e) => {
    e.preventDefault();
    await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.token));
        dispatch(login());
      })
      .catch((err) => {
        console.error(err);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div className={style.loginpage}>
      <div>
        <h3>Login</h3>
        <form action="" onSubmit={LoginHandler}>
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <label htmlFor="password">PASSWORD</label>
            <div>forgot?</div>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
        <Link to="/account/create-account" className={style.createacc}>
          <div>Create an account</div>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
