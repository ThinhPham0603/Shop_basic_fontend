import React from "react";
import HeaderComponent from "../HeaderComponent/headerComponent";

const defaultComponent = ({children}) => {
  return (
    <div>
     <HeaderComponent/>
     {children}
    </div>
  );
};

export default defaultComponent;
