import React from "react";
import style from "./Admin.module.scss";

const Admin = (props) => {
  return (
    <div className={style.admin}>
      <div>Add new product</div>
      <form action="">
        <label htmlFor="name">NAME</label>
        <input type="text" id="name" />
        <label htmlFor="descr">DISCRIPTION</label>
        <input type="text" id="descr" />
        <label htmlFor="price">PRICE</label>
        <input type="text" id="price" />
        <label htmlFor="category">CATEGORY</label>
        <input type="text" id="category" />
      </form>
    </div>
  );
};

export default Admin;
