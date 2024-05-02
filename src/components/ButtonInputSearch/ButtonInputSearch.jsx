import React from "react";

import { SearchOutlined } from "@ant-design/icons";

import InputComponent from "../InputComponent/inputComponent";
import ButtonComponent from "../ButtonComponent/buttonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,placeholder,textbutton,bordered,
    backgroundColorInput = "#fff", colorButton = "#fff",
    backgroundColorButton = 'rgb(13,92,182)',
  } = props;
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        //variant = {bordered}
        style ={{  backgroundColor: backgroundColorInput,
        borderRadius: "0px",
        }}
        {...props}
      />
      <ButtonComponent
        size={size} 
        stylebutton={{  background: backgroundColorButton,
        color: colorButton,  variant: !bordered && 'none', 
        borderRadius: "0px"}}
        icon={<SearchOutlined  color={colorButton} style={{color: '#fff'}}/>}
        textbutton = {textbutton}
        styletextbutton={{color:colorButton}}>
      </ButtonComponent>
    </div>
  );
};

export default ButtonInputSearch;
