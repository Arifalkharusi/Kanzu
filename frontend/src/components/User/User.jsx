import React, { useEffect } from "react";
import style from "./User.module.scss";
import { useNavigate, Navigate } from "react-router-dom";
import { login, userData } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const User = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, data } = useSelector((state) => state.userSlice);

  const { firstName, lastName } = data;

  useEffect(() => {
    const fetchUser = async () => {
      await fetch("/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: String(token).replaceAll('"', ""),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(userData(data));
        })
        .catch((err) => {
          console.error(err);
          dispatch(login("token-error"));
        });
    };
    fetchUser();
  }, [dispatch, token]);

  if (!token) return <Navigate to="/account/login" />;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(login());
    navigate("/");
  };

  return (
    <div className={style.user}>
      <div>
        <div className={style.topsec}>
          <div>My Account</div>
          <button onClick={logoutHandler}>Log out</button>
        </div>
        <div className={style.botsec}>
          <div className={style.order}>
            <h3>Order History</h3>
            <div>
              <div>You haven't placed any orders yet.</div>
            </div>
          </div>
          <div className={style.account}>
            <h3>Account Details</h3>
            <div>
              <div>{`${firstName} ${lastName}`}</div>
              <div>
                <div>438 Beaconview Road</div>
                <div>West Bromwich</div>
                <div>B71 3PH</div>
                <div>United Kingdom</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
