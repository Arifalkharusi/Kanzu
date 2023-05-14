import React, { useState } from "react";
import style from "./RegisterPage.module.scss";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterPage = (props) => {
  const [email, setEmail] = useState(``);
  const [firstName, setFirstName] = useState(``);
  const [lastName, setLastName] = useState(``);
  const [password, setPassword] = useState(``);
  const [registered, setRegistered] = useState(false);
  const { token } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  if (token) return <Navigate to="/account/user" />;
  if (registered) navigate("/account/login");

  const LoginHandler = (e) => {
    e.preventDefault();
    fetch("/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => setRegistered(data.registered))
      .catch((err) => console.error(err));

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className={style.registerpage}>
      <div>
        <h3>Create Account</h3>
        <form action="" onSubmit={LoginHandler}>
          <label htmlFor="fname">FIRST NAME</label>
          <input
            type="text"
            id="fname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lname">LAST NAME</label>
          <input
            type="text"
            id="lname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
        <Link to="/account/login" className={style.createacc}>
          <div>Login</div>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
