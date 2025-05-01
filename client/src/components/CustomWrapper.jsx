import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoadUserQuery } from "@/features/api/authApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { userLoggedIn } from "@/features/authSlice";

const CustomWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useLoadUserQuery();

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(userLoggedIn({ user: data.user }));
    }
  }, [isSuccess, data, dispatch]);

  return <>{isLoading ? <LoadingSpinner /> : children}</>;
};

export default CustomWrapper;
