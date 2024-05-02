import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import {
  WrapperContextPopup,
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";

import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/userServices";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/loading";
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleNavigateHomePage = () => {
    navigate("/");
  };
  const handleLogOut = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate("/");
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContextPopup onClick={() => handleClickNavigate("/profile")}>
        Thông tin người dùng
      </WrapperContextPopup>
      {user?.isAdmin && (
        <WrapperContextPopup onClick={() => handleClickNavigate("admin")}>
          Quản lý hệ thống
        </WrapperContextPopup>
      )}
      <WrapperContextPopup onClick={() => handleClickNavigate("/my-order")}>
        Đơn hàng của tôi
      </WrapperContextPopup>
      <WrapperContextPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContextPopup>
    </div>
  );
  const handleClickNavigate = (type) =>{
    if(type === '/profile'){
     navigate("/profile-user");
    }else if(type === 'admin'){
      navigate("/system/admin");
    }else if (type === '/my-order'){
       navigate("/my-order", {
         state: {
           id: user?.id,
           token: user?.access_token,
         },
       });}
    else {
      handleLogOut()
    }
    setIsOpenPopup(false)
  }
  const onSearch = (e) => {
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div
      style={{
        width: "100%",
        background: "rgb(26,148,255)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col span={5} style={{ display: "flex", justifyContent: "center" }}>
          <WrapperTextHeader onClick={handleNavigateHomePage}>
            LAPTRINHTHATDE
          </WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={11}>
            <ButtonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="Bạn cần tìm kiếm gì?"
              onChange={onSearch}
            />
          </Col>
        )}
        <Col
          span={8}
          style={{ display: "flex", gap: "15px", alignItems: "center" }}
        >
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                ></img>
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}

              {user?.access_token ? (
                <>
                  <Popover
                    content={content}
                    trigger="click"
                    style={{ float: "right" }}
                    open={isOpenPopup}
                  >
                    <div
                      style={{ fontSize: "15px", cursor: "pointer" }}
                      onClick={() => setIsOpenPopup((prev) => !prev)}
                    >
                      {/* {user.name || user.email || "User"} */}
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng nhập/ Đăng ký
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined style={{ fontSize: 15 }} />
                  </div>
                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>
          {!isHiddenCart && (
            <div
              onClick={() => navigate("/order")}
              style={{ cursor: "pointer" }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
