import { Menu } from "antd";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { getItem } from "../../utils";
import HeaderComponent from "../../components/HeaderComponent/headerComponent";
import AdminUser from "../../components/AdminUser/adminUser";
import AdminProduct from "../../components/AdminProduct/adminProduct";
import OrderProduct from "../../components/OrderProduct/OrderProduct";

const items = [
  getItem("Người dùng", "user", <UserOutlined />),
  getItem("Sản phẩm", "product", <AppstoreOutlined />),
  getItem("Đơn hàng", "order", <ProductOutlined />),
];

const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("");
  const renderPage = (key) =>{
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <OrderProduct />;
      default:
        return <></>;
    }
  }
  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };
  
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex", overflowX: 'hidden' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["231"]}
          style={{
            width: 256,
            height:' 100vh',
            boxShadow: '1px 1px 2px #ccc',
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{flex: 1, padding: '15px'}}>{renderPage(keySelected)}</div>
      </div>
    </>
  );
};

export default AdminPage;
