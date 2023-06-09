import React, { useState } from "react";
import style from "./Menu.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { openMenu } from "../../store/menuSlice";
import { Link } from "react-router-dom";

const menueList = [
  { name: "NEW" },
  {
    name: "Men",
    subCat: [
      {
        name: "Thobe",
        subCat: [
          { name: "Oman Thobe" },
          { name: "Short Sleeve Thobe" },
          { name: "Hooded Thobe" },
        ],
      },
      { name: "Trousers" },
      { name: "Caps" },
      { name: "Keffiyah" },
    ],
  },
  {
    name: "Women",
    subCat: [
      {
        name: "Hijab",
        subCat: [{ name: "Jersey Hijab" }, { name: "Rayon Hijab" }],
      },
      { name: "Abayah" },
      { name: "Kimonos" },
    ],
  },
  {
    name: "Kids",
    subCat: [{ name: "Kids Thobe" }],
  },
  {
    name: "Fragrance",
    subCat: [{ name: "Spray Perfume" }, { name: "Oil Fragrance" }],
  },
];

const Menu = (props) => {
  const dispatch = useDispatch();
  const [menuContent, setMenuContent] = useState(menueList);
  const { displayMenu } = useSelector((state) => state.menuSlice);
  const [trans, setTrans] = useState(true);

  const categoryHandler = (x) => {
    setMenuContent(x.subCat);
    setTrans(false);
    setTimeout(() => {
      setTrans(true);
    }, 0);
  };

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

      <div
        className={`${style.content}`}
        style={{
          transform: trans && "translateX(0%)",
          transition: !trans && "none",
        }}
      >
        {menuContent[0].name !== "NEW" && (
          <svg
            onClick={() => setMenuContent(menueList)}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
          >
            <path d="M 19.8125 13.09375 C 19.59375 13.132813 19.398438 13.242188 19.25 13.40625 L 8.34375 24.28125 L 7.65625 25 L 8.34375 25.71875 L 19.25 36.59375 C 19.492188 36.890625 19.878906 37.027344 20.253906 36.941406 C 20.625 36.855469 20.917969 36.5625 21.003906 36.191406 C 21.089844 35.816406 20.953125 35.429688 20.65625 35.1875 L 11.46875 26 L 41 26 C 41.359375 26.003906 41.695313 25.816406 41.878906 25.503906 C 42.058594 25.191406 42.058594 24.808594 41.878906 24.496094 C 41.695313 24.183594 41.359375 23.996094 41 24 L 11.46875 24 L 20.65625 14.8125 C 20.980469 14.511719 21.066406 14.035156 20.871094 13.640625 C 20.679688 13.242188 20.246094 13.023438 19.8125 13.09375 Z"></path>
          </svg>
        )}
        {menuContent.map((x) => (
          <div
            className={style.link}
            onClick={() => x.subCat && categoryHandler(x)}
          >
            <Link
              to={!x.subCat && `/items/${x.name.toLocaleLowerCase()}`}
              onClick={() => !x.subCat && dispatch(openMenu())}
            >
              {x.name}
            </Link>
            {x.subCat && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
              >
                <path d="M 29.84375 13.09375 C 29.46875 13.160156 29.167969 13.433594 29.0625 13.796875 C 28.957031 14.164063 29.066406 14.554688 29.34375 14.8125 L 38.53125 24 L 9 24 C 8.96875 24 8.9375 24 8.90625 24 C 8.355469 24.027344 7.925781 24.496094 7.953125 25.046875 C 7.980469 25.597656 8.449219 26.027344 9 26 L 38.53125 26 L 29.34375 35.1875 C 29.046875 35.429688 28.910156 35.816406 28.996094 36.191406 C 29.082031 36.5625 29.375 36.855469 29.746094 36.941406 C 30.121094 37.027344 30.507813 36.890625 30.75 36.59375 L 41.65625 25.71875 L 42.34375 25 L 41.65625 24.28125 L 30.75 13.40625 C 30.542969 13.183594 30.242188 13.070313 29.9375 13.09375 C 29.90625 13.09375 29.875 13.09375 29.84375 13.09375 Z"></path>
              </svg>
            )}
          </div>
        ))}
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
