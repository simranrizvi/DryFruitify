"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/src/features/auth/authSlice";
import { fetchCart } from "@/src/features/cart/cartSlice";

export default function AuthCartWrapper({ children }) {
  const dispatch = useDispatch();
  const { authCheckCompleted, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
    }
  }, [dispatch, isLoggedIn]);

  if (!authCheckCompleted) return null; // Wait till auth check completes

  return children;
}
