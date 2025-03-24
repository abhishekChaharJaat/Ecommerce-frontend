import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import EditUserInfoPopup from "../component/EditUserInfoPopup";

const Popups = () => {
  return (
    <div>
      <Signup />
      <Login />
      <EditUserInfoPopup />
    </div>
  );
};

export default Popups;
