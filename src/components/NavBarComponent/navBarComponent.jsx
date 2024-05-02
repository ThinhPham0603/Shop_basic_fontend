import React, { useEffect, useState } from "react";
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from "./style";
import { Checkbox, Rate } from "antd";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/productService";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import TypeProduct from "../TypeProduct/typeProduct";
const onChange = (checkedValues) => {

};

const NavBarComponent = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [typeProducts, setTypeProducts] = useState([]);
  const [limit, setLimit] = useState(5);
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
    return res;
  };
  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  // const renderContent = (type, options) => {
  //   switch (type) {
  //     case "text":
  //       return options.map((option) => {
  //         return <WrapperTextValue>{option}</WrapperTextValue>;
  //       });
  //     case "checkbox":
  //       return (
  //         <Checkbox.Group
  //           style={{
  //             width: "100%",
  //             display: "flex",
  //             flexDirection: "column",
  //             gap: "12px",
  //           }}
  //           onChange={onChange}
  //         >
  //           {options.map((option) => {
  //             return <Checkbox value={option.value}>{option.label}</Checkbox>;
  //           })}
  //         </Checkbox.Group>
  //       );

  //     case "star":
  //       return options.map((option) => {
  //         return (
  //           <div style={{ display: "flex" }}>
  //             <Rate
  //               style={{ fontSize: "12px" }}
  //               disabled
  //               defaultValue={option}
  //             />
  //             <span>{`Từ ${option} sao`}</span>
  //           </div>
  //         );
  //       });

  //     case "price":
  //       return options.map((option) => {
  //         return <WrapperTextPrice >{option}</WrapperTextPrice>;
  //       });
  //     default:
  //       return {};
  //   }
  // };

  return (
    <div>
      <WrapperLableText>Lable</WrapperLableText>
      <WrapperContent>
        {typeProducts.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </WrapperContent>
      
    </div>
  );
};

export default NavBarComponent;
