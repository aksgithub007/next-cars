import React from "react";
import { Provider } from "react-redux";
import store from "@/Redux/store";

function RootProvider({ children }) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}

export default RootProvider;
