import React from "react";
import style from "./SizeChart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { openSizeChart } from "../../store/sizeChartSlicer";

const SizeChart = (props) => {
  const dispatch = useDispatch();
  const { diplaySizeChart } = useSelector((state) => state.sizeChartSlicer);

  return (
    <div
      className={style.sizechart}
      style={{ display: diplaySizeChart ? "none" : "flex" }}
    >
      <div
        className={style.overlay}
        onClick={() => dispatch(openSizeChart())}
      ></div>
      <div className={style.main}>
        <svg
          onClick={() => dispatch(openSizeChart())}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
        >
          <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
        </svg>
        <div>
          <p>
            Please use the charts below as a rough guideline to measurements
            through all international sizings. Please note sizes may vary
            between Brand and Designer as reflection of their individual look
            and fit, we do our best to give a detailed description of fit next
            to each item, however if you are unsure about a particular fit
            please contact us before placing your order and we will do our best
            to supply you with the info you require.
          </p>
          <img src={require("../../img/sizechart.png")} alt="" />
          <div>MENS THOBES SIZE CHART</div>
          <img src={require("../../img/mensizechart.png")} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
