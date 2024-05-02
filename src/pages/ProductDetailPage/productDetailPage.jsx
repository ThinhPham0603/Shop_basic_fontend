import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/productDetailComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const {id} = useParams()
  const naivigate = useNavigate()
  return (
    <div
      style={{ height:'100vh', background: "#efefef",width: '100%' }}
    >
      <div style={{cursor:'pointer', fontWeight: '600', padding:'15 px'}}><span onClick={() =>{naivigate('/')}} style={{cursor:'pointer'}}>Trang chủ</span> - Chi tiet san pham</div>
      <ProductDetailComponent idProduct = {id}/>
    </div>
  );
};

export default ProductDetailPage;
