import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import EditUserInfoPopup from "../component/EditUserInfoPopup";
import OrderPlacedPopup from "../component/OrderPlacedPopup";

const Popups = () => {
  return (
    <div>
      <Signup />
      <Login />
      <EditUserInfoPopup />
      <OrderPlacedPopup/>
    </div>
  );
};

export default Popups;
