import { Spin } from "antd";
import React from "react";

const Loading = ({ children, isLoading, delay = 2000 }) => {
  return (
    <Spin spinning={isLoading} delay={5000}>
      {children}
    </Spin>
  );
};

export default Loading;
