import React, { useState, useEffect } from "react";
import style from "./ProductPage.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSizeChart } from "../../store/sizeChartSlicer";
import { openFindSize } from "../../store/findSizeSlicer";
import { addItem, openCart, loadItems } from "../../store/cartSlice";

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [data, setData] = useState([]);
  const [length, setLength] = useState(``);
  const [size, setSize] = useState(``);
  const [inv, setInv] = useState(``);
  const { itemid } = useParams();

  useEffect(() => {
    fetch("https://kanzu-api.onrender.com/api/admin/find-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: itemid.split("=")[1],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        navigate("/items");
      });
  }, [itemid, navigate]);

  const lengthArr = [52, 54, 56, 58, 60];
  const sizeArr = ["M", "L", "XL", "XXL"];

  const selectorHandler = (e, messure) => {
    if (e.target.classList.contains("select")) {
      e.target.parentElement.childNodes.forEach(
        (x) => (x.style.border = "2px rgb(218, 218, 218) solid")
      );
      e.target.style.border = "2px black solid";

      if (messure === "size") setSize(e.target.innerHTML);
      if (messure === "length") setLength(e.target.innerHTML);
    }
  };

  const addToCartHandler = async () => {
    const product = {
      id: data._id,
      product: data.product,
      price: data.price,
      size: size,
      length: length,
      quantity: qty,
      img: data.image[0],
    };

    dispatch(addItem(product));
    dispatch(loadItems());
    dispatch(openCart());
  };

  return (
    <div className={style.productpage}>
      <div className={style.main}>
        <div className={style.left}>
          {data?.image?.map((x) => (
            <img src={x} alt="" />
          ))}
        </div>
        <div className={style.right}>
          <div className={style.container}>
            <div className={style.details}>
              <div>{data?.product}</div>
              <div>£{data?.price} GBP</div>
            </div>

            <div className={style.length}>
              <label>
                LENGTH <span>{inv && `${inv} left in stock`} </span>
              </label>

              <div onClick={(e) => selectorHandler(e, "length")}>
                {lengthArr.map((x, i) => {
                  let disabled;
                  if (data.measurements)
                    disabled = data?.measurements[i]?.quantity < 1;

                  return (
                    <div
                      className={`select ${disabled ? style.disabled : ""}`}
                      onClick={() => setInv(data?.measurements[i]?.quantity)}
                    >
                      {x}"
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.size}>
              <label>
                SIZE
                <span onClick={() => dispatch(openSizeChart())}>
                  - Size chart
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <path d="M 14.5 5 C 10.660557 5 7.1640187 5.9401666 4.5214844 7.5664062 C 1.8789501 9.1926461 0 11.632331 0 14.5 C 0 14.70379 0.030250387 14.900281 0.048828125 15.099609 A 1.50015 1.50015 0 0 0 0 15.5 L 0 28.5 C 0 35.3857 5.6143004 41 12.5 41 L 48 41 L 48 21 L 14.5 21 C 11.159443 21 8.1562157 20.148166 6.09375 18.878906 C 4.0312843 17.609646 3 16.050331 3 14.5 C 3 12.949669 4.0312843 11.390354 6.09375 10.121094 C 8.1562157 8.8518333 11.159443 8 14.5 8 C 17.840557 8 20.843784 8.8518333 22.90625 10.121094 C 24.968716 11.390354 26 12.949669 26 14.5 A 1.50015 1.50015 0 1 0 29 14.5 C 29 11.632331 27.12105 9.192646 24.478516 7.5664062 C 21.835981 5.9401665 18.339443 5 14.5 5 z M 14.5 12.5 A 3 2 0 0 0 14.5 16.5 A 3 2 0 0 0 14.5 12.5 z M 3 20.316406 C 3.4712823 20.718858 3.9750341 21.097303 4.5214844 21.433594 C 6.682294 22.763376 9.4941331 23.480674 12.517578 23.753906 A 1.50015 1.50015 0 0 0 12.5 24 L 12.5 29 A 1.50015 1.50015 0 1 0 15.5 29 L 15.5 24 L 20.5 24 L 20.5 29 A 1.50015 1.50015 0 1 0 23.5 29 L 23.5 24 L 29 24 L 29 29 A 1.50015 1.50015 0 1 0 32 29 L 32 24 L 37 24 L 37 29 A 1.50015 1.50015 0 1 0 40 29 L 40 24 L 45 24 L 45 38 L 12.5 38 C 7.2356996 38 3 33.7643 3 28.5 L 3 20.316406 z"></path>
                  </svg>{" "}
                </span>
              </label>
              <div onClick={(e) => selectorHandler(e, "size")}>
                {sizeArr.map((x) => (
                  <div className="select">{x}</div>
                ))}
              </div>
            </div>
            <div className={style.findsize}>
              <button onClick={() => dispatch(openFindSize())}>
                FIND YOUR SIZE <span>?</span>
              </button>
            </div>
            <div className={style.quantity}>
              <label>QUANTITY</label>
              <div>
                <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
                <input
                  type="number"
                  value={qty}
                  min={1}
                  onChange={(e) => setQty(+e.target.value)}
                />
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>
            <div className={style.addtocart}>
              <button onClick={addToCartHandler}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
