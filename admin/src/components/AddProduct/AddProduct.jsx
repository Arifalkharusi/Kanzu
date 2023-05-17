import React, { useState } from "react";
import style from "./AddProduct.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addImg, deleteImg, addMessurements } from "../../store/addItemSlice";

const Size = ({ length, index }) => {
  const dispatch = useDispatch();
  const { size } = useSelector((state) => state.addItemSlice);

  return (
    <div>
      <div>{length}"</div>
      <input
        type="tel"
        defaultValue={0}
        min={0}
        value={size[index].quantity}
        onChange={(e) =>
          dispatch(addMessurements({ index, qty: e.target.value }))
        }
      />
    </div>
  );
};

const ImageUrl = ({ url, index }) => {
  const dispatch = useDispatch();
  return (
    <div onDoubleClick={() => dispatch(deleteImg(index))}>
      <img src={url} alt="" />
    </div>
  );
};

const AddProduct = (props) => {
  const [productName, setProductName] = useState(``);
  const [price, setPrice] = useState(0);
  const [discription, setDiscription] = useState(``);
  const [category, setCategory] = useState(``);
  const [imgUrl, setImgUrl] = useState(``);
  const dispatch = useDispatch();

  const { imgArr, size } = useSelector((state) => state.addItemSlice);

  const submitItemHandler = async () => {
    let item = {
      product: productName,
      description: discription,
      image: imgArr,
      price: price,
      category: category.toLowerCase(),
      measurements: size,
    };

    await fetch(
      "https://kanzu-production.up.railway.app/api/admin/add-product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={style.addproduct}>
      <h1>ADD NEW PRODUCT</h1>
      <div>
        <div>
          <label htmlFor="pname">Product Name</label>
          <input
            type="text"
            id="pname"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="disc">Discription</label>
          <textarea
            rows={10}
            cols={50}
            type="text"
            id="disc"
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cat">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Abayah">Abayah</option>
            <option value="Trousers">Trousers</option>
            <option value="Caps">Caps</option>
            <option value="Keffiyah">Keffiyah</option>
            <option value="Kimonos">Kimonos</option>
            <option value="Kids Thobe">Kids Thobe</option>
            <option value="Oman Thobe">Oman Thobe</option>
            <option value="Short Sleeve Thobe">Short Sleeve Thobe</option>
            <option value="Hooded Thobe">Hooded Thobe</option>
            <option value="Jersey Hijab">Jersey Hijab</option>
            <option value="Rayon Hijab">Rayon Hijab</option>
            <option value="Spray Perfume">Spray Perfume</option>
            <option value="Oil Fragrance">Oil Fragrance</option>
          </select>
        </div>
        <div className={style.size}>
          {size.map((x, i) => (
            <Size length={x.length} index={i} />
          ))}
        </div>
        <div className={style.imgprev}>
          {imgArr.map((x, i) => (
            <ImageUrl url={x} index={i} />
          ))}
        </div>
        <div className={style.img}>
          <div>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <button
              onClick={() => {
                dispatch(addImg(imgUrl));
                setImgUrl("");
              }}
            >
              Add Img
            </button>
          </div>
        </div>
        <button onClick={submitItemHandler}>SUBMIT ITEM</button>
      </div>
    </div>
  );
};

export default AddProduct;
