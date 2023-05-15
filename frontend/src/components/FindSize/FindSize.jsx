import React, { useState } from "react";
import style from "./FindSize.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { openFindSize } from "../../store/findSizeSlicer";

const FindSize = (props) => {
  const [lengthRange, setLengthRange] = useState(0);
  const [yourSize, setYourSize] = useState(0);
  const [height, setHeight] = useState([5, 2]);
  const [sizeRange, setSizeRange] = useState(0);
  const [shirtSize, setShirtSize] = useState("SMALL");
  const dispatch = useDispatch();
  const { diplayFindSize } = useSelector((state) => state.findSizeSlicer);

  const youSizeArr = [
    {
      size: 52,
      lengthRange: [
        [5, 2],
        [5, 3],
      ],
    },
    {
      size: 54,
      lengthRange: [
        [5, 4],
        [5, 5],
      ],
    },
    {
      size: 56,
      lengthRange: [
        [5, 6],
        [5, 7],
      ],
    },
    {
      size: 58,
      lengthRange: [
        [5, 8],
        [5, 9],
      ],
    },
    {
      size: 60,
      lengthRange: [
        [5, 10],
        [5, 11],
        [6, 0],
      ],
    },
  ];

  const findSizeHandler = () => {
    youSizeArr.forEach((x) => {
      x.lengthRange.forEach((e) => {
        if (height[0] === e[0] && e[1] === height[1]) {
          setYourSize(x.size);
        }
      });
    });
  };

  const sizeHandler = (e) => {
    const sizeChart = ["SMALL", "MEDIUM", "LARGE", "X-LARGE", "XX-LARGE"];
    setShirtSize(sizeChart[e.target.value]);
    setSizeRange(e.target.value);
  };

  const toggoleSizeFinder = () => {
    dispatch(openFindSize());
    setYourSize(0);
  };

  const lengthHandler = (e) => {
    const lengthChart = [
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
      [5, 9],
      [5, 10],
      [5, 11],
      [6, 0],
    ];
    setHeight(lengthChart[e.target.value]);
    setLengthRange(e.target.value);
  };

  return (
    <div
      className={style.findsize}
      style={{ display: diplayFindSize ? "none" : "flex" }}
    >
      <div className={style.overlay} onClick={toggoleSizeFinder}></div>
      <div className={style.main}>
        <svg
          onClick={toggoleSizeFinder}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
        >
          <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
        </svg>
        {yourSize ? (
          <div className={style.yoursize}>
            <h1>YOUR SIZE</h1>
            <div>{`${yourSize}" ${shirtSize}`}</div>
          </div>
        ) : (
          <div>
            <h3>WE HELP YOU FIND THE RIGHT SIZE</h3>
            <p>
              We calculate the perfect fit based on your unique measurements
            </p>
            <div>
              <h3>MEASUREMENTS</h3>
              <p>YOUR HEIGHT AND T-SHIRT SIZE</p>
            </div>
            <div>
              <div className={style.rangesec}>
                <div className={style.rangetags}>
                  <div>HEIGHT:</div>
                  <div>
                    <div>FT</div>
                    <div>{height[0]}</div>
                  </div>
                  <div>
                    <div>IN</div>
                    <div>{height[1]}</div>
                  </div>
                </div>
                <div>
                  <div className={style.slider}>
                    <svg
                      style={{
                        left: `${(lengthRange / 10) * 100}%`,
                      }}
                      className={style.selector}
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                    >
                      <path d="M 1 4 L 12 22.300781 L 23 4 L 1 4 z"></path>
                    </svg>
                    <input
                      type="range"
                      max={10}
                      className={style.range}
                      value={lengthRange}
                      onChange={lengthHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={style.rangesec}>
              <div className={style.rangetags}>
                <div>T-SHIRT SIZE:</div>
                <div>{shirtSize}</div>
              </div>
              <div className={style.slider}>
                <svg
                  style={{
                    left: `${(sizeRange / 4) * 100}%`,
                  }}
                  className={style.selector}
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                >
                  <path d="M 1 4 L 12 22.300781 L 23 4 L 1 4 z"></path>
                </svg>
                <input
                  type="range"
                  max={4}
                  className={style.range}
                  value={sizeRange}
                  onChange={sizeHandler}
                />
              </div>
            </div>
            <div>
              <button onClick={findSizeHandler}>FIND MY SIZE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindSize;
