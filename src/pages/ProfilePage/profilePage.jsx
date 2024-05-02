import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/inputForm";
import ButtonComponent from "../../components/ButtonComponent/buttonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/userServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/loading";
import * as message from "../../components/Message/message";
import { updateUser } from "../../redux/slides/userSlide";
import { Button } from "antd";
import {  UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };

  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
    }
    setAvatar(file.preview)
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div style={{ width: "1100px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isLoading={isLoading}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name:</WrapperLabel>
            <InputForm
              id="name"
              value={name}
              onChange={handleOnchangeName}
              style={{ width: "300px", borderRadius: "0px" }}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              stylebutton={{
                height: "30px",
                width: "fit-content",
                border: "1px solid rgb(26,148,255)",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textbutton={"Cập nhật"}
              styletextbutton={{
                fontSize: "15px",
                fontWeight: "650",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email:</WrapperLabel>
            <InputForm
              id="email"
              value={email}
              onChange={handleOnchangeEmail}
              style={{ width: "300px", borderRadius: "0px" }}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              stylebutton={{
                height: "30px",
                width: "fit-content",
                border: "1px solid rgb(26,148,255)",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textbutton={"Cập nhật"}
              styletextbutton={{
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone:</WrapperLabel>
            <InputForm
              id="phone"
              value={phone}
              onChange={handleOnchangePhone}
              style={{ width: "300px", borderRadius: "0px" }}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              stylebutton={{
                height: "30px",
                width: "fit-content",
                border: "1px solid rgb(26,148,255)",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textbutton={"Cập nhật"}
              styletextbutton={{
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address:</WrapperLabel>
            <InputForm
              id="address"
              value={address}
              onChange={handleOnchangeAddress}
              style={{ width: "300px", borderRadius: "0px" }}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              stylebutton={{
                height: "30px",
                width: "fit-content",
                border: "1px solid rgb(26,148,255)",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textbutton={"Cập nhật"}
              styletextbutton={{
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar:</WrapperLabel>
            <WrapperUploadFile
              onChange={handleOnchangeAvatar}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}> Upload</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              stylebutton={{
                height: "30px",
                width: "fit-content",
                background: "#286090",
                border: "1px solid rgb(26,148,255)",
                borderRadius: "4px",
                padding: "2px 6px 6px",
              }}
              textbutton={"Cập nhật"}
              styletextbutton={{
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "650",
              }}
            ></ButtonComponent>
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
