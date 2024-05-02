import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperItemOrder,
  WrapperCountOrder,
  WrapperOrderInfo,
} from "./style";
import { convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent/loading";
import { orderContant } from "../../contant";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;
  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <Loading isLoading={false}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3 style={{ fontWeight: "bold", marginLeft: "20px" }}>
            Đơn hàng đã đặt thành công
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                  <WrapperValue>
                    <span
                      style={{
                        color: "#ea8500",
                        fontWeight: "bold",
                        marginRight: "20px",
                      }}
                    >
                      {orderContant.delivery[state?.delivery]}
                    </span>
                    Giao hàng tiết kiệm
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperOrderInfo>
                {state.order?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.product}>
                      <div
                        style={{
                          width: "390px",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <img
                          src={order.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                          alt=""
                        />
                        <div
                          style={{
                            width: 260,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            Giá Tiền:{" "}
                            {convertPrice(order?.price)}
                          </span>
                        </span>
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            Số lượng:{" "}
                            {order?.amount}
                          </span>
                        </span>
                        <span
                          style={{
                            color: "rgb(255, 66, 78)",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          Thanh toán:{" "}
                          {convertPrice(state?.totalPriceMemo)}
                        </span>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperOrderInfo>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSuccess;
