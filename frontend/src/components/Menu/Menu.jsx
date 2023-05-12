import React from "react";
import style from "./Menu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { openMenu } from "../../store/menuSlice";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const dispatch = useDispatch();
  const { displayMenu } = useSelector((state) => state.menuSlice);

  return (
    <div
      className={style.menu}
      style={{
        transform: displayMenu ? "translateX(-360px)" : "translateX(0px)",
      }}
    >
      <svg
        onClick={() => dispatch(openMenu())}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="50px"
        height="50px"
      >
        <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
      </svg>

      <div className={style.content}>
        <Link to="/items" onClick={() => dispatch(openMenu())}>
          NEW
        </Link>
        <Link to="/items" onClick={() => dispatch(openMenu())}>
          Men
        </Link>
        <Link to="/items" onClick={() => dispatch(openMenu())}>
          Women
        </Link>
        <Link to="/items" onClick={() => dispatch(openMenu())}>
          Kids
        </Link>
        <Link to="/items" onClick={() => dispatch(openMenu())}>
          Fragrance
        </Link>
      </div>
      <div
        className={style.overlay}
        style={{ display: displayMenu ? "none" : "block" }}
        onClick={() => dispatch(openMenu())}
      ></div>
    </div>
  );
};

export default Menu;
