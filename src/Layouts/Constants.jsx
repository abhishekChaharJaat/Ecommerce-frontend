import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../store/userSlice";
import { toast } from "react-toastify";

const Constants = () => {
  const dispatch = useDispatch();

  const userError = useSelector((state) => state.userSlice.error);
  const userSuccessMessage = useSelector(
    (state) => state.userSlice.successMessage
  );
  const productError = useSelector((state) => state.productSlice.error);
  const productSuccessMessage = useSelector(
    (state) => state.productSlice.successMessage
  );
  const token = useSelector((state) => state.userSlice.token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [token, dispatch]);

  // For userSlice Toast
  useEffect(() => {
    if (userSuccessMessage) {
      toast.success(userSuccessMessage);
    } else {
      toast.error(userError);
    }
  }, [userError, userSuccessMessage]);

  // For productSlice Toast
  useEffect(() => {
    if (productSuccessMessage) {
      toast.success(productSuccessMessage);
    } else {
      toast.error(productError);
    }
  }, [productError, productSuccessMessage]);

  return <></>;
};

export default Constants;
