import React from "react";
import style from "./CartItem.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItem, editItem } from "../../store/cartSlice";
import { openCart } from "../../store/cartSlice";

const CartItem = ({ items, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToItem = () => {
    navigate(`/items/product/item=${items.id}`);
    dispatch(openCart());
  };

  return (
    <div className={style.cartitem}>
      <img src={items.img} alt="" onClick={navigateToItem} />
      <div className={style.rightsec}>
        <div className={style.details}>
          <div>{items.product}</div>
          <div>
            {items.length} / {items.size}
          </div>
        </div>
        <div className={style.botsec}>
          <div className={style.qty}>
            <button
              onClick={() =>
                items.quantity > 1
                  ? dispatch(editItem({ index, dir: "minus" }))
                  : dispatch(removeItem(index))
              }
            >
              -
            </button>
            <input
              type="tel"
              value={items.quantity}
              min={1}
              onChange={(e) => {}}
            />
            <button onClick={() => dispatch(editItem({ index, dir: "plus" }))}>
              +
            </button>
          </div>
          <div>£{items.price} GBP</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
