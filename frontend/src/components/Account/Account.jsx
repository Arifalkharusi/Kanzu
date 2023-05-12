import React from "react";
import { Outlet } from "react-router-dom";

const Account = (props) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Account;
