import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfoDrawer from "../component/UserInfoDrawer";
import { setOpenUserInfoDrawer } from "../store/userSlice";

const Drawers = () => {
  const dispatch = useDispatch();

  const isOpenUserInfoDrawer = useSelector(
    (state) => state.userSlice.isOpenUserInfoDrawer
  );
  return (
    <div>
      <UserInfoDrawer
        isOpen={isOpenUserInfoDrawer}
        onClose={() => dispatch(setOpenUserInfoDrawer(false))}
      />
    </div>
  );
};

export default Drawers;
