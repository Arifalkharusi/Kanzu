import React, { useEffect, useState } from "react";
import style from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { openCart } from "../../store/cartSlice";
import CartItem from "../CartItem/CartItem";
import { loadItems } from "../../store/cartSlice";
import { TailSpin } from "react-loader-spinner";

const Cart = (props) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { displayCart } = useSelector((state) => state.cartSlice);
  const { items } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  let total = 0;
  items.forEach((x) => {
    total += x.quantity * x.price;
  });

  const checkoutHandler = async () => {
    setLoader(true);
    await fetch("/api/checkout/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location = data.paymentUrl;
      })
      .catch((err) => {
        setLoader(false);
        console.error(err);
      });
  };

  return (
    <div
      className={style.cart}
      style={{
        transform: displayCart ? "translateX(360px)" : "translateX(0px)",
      }}
    >
      <svg
        onClick={() => dispatch(openCart())}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="50px"
        height="50px"
      >
        <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
      </svg>

      <div className={style.content}>
        {items.map((x, i) => (
          <CartItem items={x} index={i} key={i} />
        ))}
      </div>
      <div className={style.total}>
        <div>SUBTOTAL</div>
        <div>£{total} GBP</div>
      </div>
      <button className={style.checkout} onClick={checkoutHandler}>
        {!loader ? (
          "CHECKOUT"
        ) : (
          <TailSpin
            height="30"
            width="30"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
      </button>
      <div
        className={style.overlay}
        style={{ display: displayCart ? "none" : "block" }}
        onClick={() => dispatch(openCart())}
      ></div>
    </div>
  );
};

export default Cart;
