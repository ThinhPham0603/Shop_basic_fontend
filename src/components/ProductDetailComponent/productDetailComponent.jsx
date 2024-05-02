import React, { useEffect, useMemo, useState } from "react";

import { Col, Image, Rate, Row } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import ButtonComponent from "../ButtonComponent/buttonComponent";
import * as ProductService from "../../services/productService";
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import * as message from "../../components/Message/message";
import LikeButtonComponent from "../LikeButtonComponent/likeButtonComponent";
import CommentComponent from "../CommentComponent/commentComponent";

const ProductDetailComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );

    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInStock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  useEffect(() => {
    if (order.isSuCessOrder) {
      message.success("Đã thêm vào giỏ hàng");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSuCessOrder]);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) setNumProduct(numProduct + 1);
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const { isLoading, data: productDetails } = useQuery(
    ["products-details", idProduct],
    fetchGetDetailsProduct,
    {
      enabled: !!idProduct,
    }
  );
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInStock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInStock: productDetails?.countInStock,
              selled: productDetails?.selled,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }

      // message.success("Đã thêm vào giỏ hàng", 3);
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: "100%" }}>
        <Row
          style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}
        >
          <Col
            span={10}
            style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
          >
            <Image
              src={productDetails?.image}
              alt="image-product"
              preview={false}
            />
            <Row style={{ padding: "10px", justifyContent: "space-between" }}>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall
                  src={productDetails?.image}
                  alt="image-small"
                  preview={false}
                />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall
                  src={productDetails?.image}
                  alt="image-small"
                  preview={false}
                />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall
                  src={productDetails?.image}
                  alt="image-small"
                  preview={false}
                />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall
                  src={productDetails?.image}
                  alt="image-small"
                  preview={false}
                />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall
                  src={productDetails?.image}
                  alt="image-small"
                  preview={false}
                />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall
                  src={productDetails?.image}
                  alt="image-small"
                  preview={false}
                />
              </WrapperStyleColImage>
            </Row>
          </Col>
          <Col span={14} style={{ paddingLeft: "10px" }}>
            <WrapperStyleNameProduct>
              {productDetails?.name}
            </WrapperStyleNameProduct>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rate
                allowHalf
                defaultValue={productDetails?.rating}
                value={productDetails?.rating}
                style={{ marginRight: "5px" }}
              />
              <WrapperStyleTextSell>
                {" "}
                | Đã bán {productDetails?.selled || 1000} +
              </WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
              <WrapperPriceTextProduct>
                {convertPrice(productDetails?.price)}
              </WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
              <span>Giao đến: </span>
              <span className="address">
                {user?.address}-{user?.city}
              </span>{" "}
              - {""}
              <span className="change-address">Đổi địa chỉ</span>
            </WrapperAddressProduct>
            <LikeButtonComponent
              dataHref={
                process.env.REACT_APP_IS_LOCAL
                  ? "https://developers.facebook.com/docs/plugins/"
                  : window.location.href
              }
            />
            <div
              style={{
                margin: "10px 0",
                padding: "10px 0",
                borderTop: "1px solid #e5e5e5",
                borderBottom: "1px solid #e5e5e5",
              }}
            >
              <div>Số Lượng</div>
              <WrapperQualityProduct>
                <button
                  style={{ border: "none", background: "transparent" }}
                  onClick={() => handleChangeCount("decrease")}
                >
                  <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
                </button>
                <WrapperInputNumber
                  onChange={onChange}
                  max={productDetails?.countInStock}
                  value={numProduct}
                />
                <button
                  style={{ border: "none", background: "transparent" }}
                  onClick={() =>
                    handleChangeCount(
                      "increase",
                      numProduct === productDetails?.countInStock
                    )
                  }
                >
                  <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
                </button>
              </WrapperQualityProduct>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              <div>
                <ButtonComponent
                  size={40}
                  stylebutton={{
                    background: "rgb(255,57,69)",
                    height: "48px",
                    width: "220px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  onClick={handleAddOrderProduct}
                  textbutton={"Chọn mua"}
                  styletextbutton={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                ></ButtonComponent>
                {errorLimitOrder && (
                  <div style={{ color: "red" }}>Sản phẩm hết hàng</div>
                )}
              </div>
              <ButtonComponent
                size={40}
                stylebutton={{
                  background: "#fff",
                  height: "48px",
                  width: "220px",
                  border: "1px solid rgb(13,92,182)",
                  borderRadius: "4px",
                }}
                textbutton={"Mua trả sau"}
                styletextbutton={{
                  color: "rgb(13,92,182)",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
            </div>
          </Col>
        </Row>
        <CommentComponent
          dataHref={
            process.env.REACT_APP_IS_LOCAL
              ? "https://developers.facebook.com/docs/plugins/comments#configurator"
              : window.location.href
          }
          width="100%"
        />
      </div>
    </Loading>
  );
};

export default ProductDetailComponent;
