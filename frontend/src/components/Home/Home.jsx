import React from "react";
import style from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className={style.container}>
      <div className={style.shop}>
        <div>EXPLORE OUR LATEST COLLECTION</div>
        <Link to="/items" className={style.btn}>
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default Home;
