import React from "react";

import { StarFilled } from "@ant-design/icons";

import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
  } = props;
  const naivigate = useNavigate();
  const handleDetailsProduct = (id) => {
    naivigate(`/product-details/${id}`);
  };
  return (
    <WrapperCardStyle
      hoverable
      header={{ width: "200px", height: "200px" }}
      style={{ width: 200 }}
      body={{ padding: "10px" }}
      cover={<img alt="Product" src={image} />}
      onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
      disabled = {countInStock === 0}
    >
      <img
        src={logo}
        alt=""
        style={{
          width: "68px",
          height: "14px",
          borderTopLeftRadius: "8px",
          position: "absolute",
          top: "-1px",
          left: "-1px",
        }}
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
        </span>
        <WrapperStyleTextSell>
          {" "}
          | Đã bán {selled || 1000} +
        </WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ margin: "30px 8px" }}>{convertPrice(price)}</span>
        <WrapperDiscountText>-{discount || 5}%</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
