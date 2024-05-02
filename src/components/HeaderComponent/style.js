import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 10px 0;
  background-color: rgb(26, 148, 255);
  align-items: center;
  /* gap: 16px; */
  flex-wrap: nowrap;
  width: 1270px;
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: right;
  cursor: pointer;
`;
export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  /* margin-left: 12px; */
  color: #fff;
  gap: 10px;
  font-size: 12px;
`;
export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  padding: 6px;
`;

export const WrapperContextPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;
