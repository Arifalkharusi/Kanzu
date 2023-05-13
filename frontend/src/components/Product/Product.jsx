import React, { useState } from "react";
import style from "./Product.module.scss";
import { Link } from "react-router-dom";
import { seletedItem } from "../../store/selectedItemSlice";
import { useDispatch } from "react-redux";

const Product = ({ data }) => {
  const dispatch = useDispatch();
  const [imgPosition, setImgPosition] = useState(0);

  const changeImgHandler = (direction) => {
    if (direction === "left" && imgPosition > 0) {
      setImgPosition(imgPosition - 1);
    } else if (direction === "right" && imgPosition < data.image.length - 1) {
      setImgPosition(imgPosition + 1);
    }
  };

  const selectedItemHandler = () => {
    window.scrollTo(0, 0);
    dispatch(seletedItem(data));
  };

  return (
    <div className={style.product}>
      <div className={style.image}>
        <Link
          to={`/items/product/item=${data._id}`}
          onClick={selectedItemHandler}
        >
          <img src={data.image[imgPosition]} alt="product" />
        </Link>
        <div
          className={style.left}
          onClick={() => changeImgHandler("left")}
          style={{ display: imgPosition > 0 ? "flex" : "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M30.28125,8.28125l-16,16l-0.6875,0.71875l0.6875,0.71875l16,16l1.4375,-1.4375l-15.28125,-15.28125l15.28125,-15.28125z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div
          className={style.right}
          onClick={() => changeImgHandler("right")}
          style={{
            display: imgPosition < data.image.length - 1 ? "flex" : "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M19.71875,8.28125l-1.4375,1.4375l15.28125,15.28125l-15.28125,15.28125l1.4375,1.4375l16,-16l0.6875,-0.71875l-0.6875,-0.71875z"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <Link
        to={`/items/product/item=${data._id}`}
        className={style.details}
        onClick={selectedItemHandler}
      >
        <div className={style.name}>{data.product}</div>
        <div className={style.price}>£{data.price} GBP</div>
      </Link>
    </div>
  );
};

export default Product;
