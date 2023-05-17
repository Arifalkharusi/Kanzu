import React, { useState } from "react";
import style from "./LoginPage.module.scss";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userSlice";
import { TailSpin } from "react-loader-spinner";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [loader, setLoader] = useState(false);
  const { token } = useSelector((state) => state.userSlice);

  if (token) return <Navigate to="/account/user" />;

  const LoginHandler = async (e) => {
    setLoader(true);
    e.preventDefault();
    await fetch("https://kanzu-production.up.railway.app/api/user/login", {
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
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
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
          <button type="submit">
            {!loader ? (
              "Sign In"
            ) : (
              <TailSpin
                height="25"
                width="25"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </button>
        </form>
        <Link to="/account/create-account" className={style.createacc}>
          <div>Create an account</div>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
