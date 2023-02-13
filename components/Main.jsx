import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";

export default function Main({ onLayout }) {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer onLayout={onLayout}>{routing}</NavigationContainer>
  );
}
