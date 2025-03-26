import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../store/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetErrorSucces } from "../store/userSlice";
import { resetProductErrorSuccess } from "../store/productSlice";

const Constants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    }
    dispatch(resetErrorSucces());
    // navigate("/");
    window.scrollTo(0, 0);
  }, [userSuccessMessage]);

  useEffect(() => {
    if (userError) {
      toast.error(userError);
    }
    dispatch(resetErrorSucces());
  }, [userError]);

  // For productSlice Toast
  useEffect(() => {
    if (productSuccessMessage) {
      toast.success(productSuccessMessage);
    }
    dispatch(resetProductErrorSuccess());
  }, [productSuccessMessage]);

  useEffect(() => {
    if (productError) {
      toast.error(productError);
    }
    dispatch(resetProductErrorSuccess());
  }, [productError]);

  return <></>;
};

export default Constants;
