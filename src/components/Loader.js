import React from "react";
import { SyncOutlined } from "@ant-design/icons";
import "../styles/components/loader.scss";

export const Loader = () => {
  return (
    <div className="loader">
      <SyncOutlined className="spinier" spin />
    </div>
  );
};

export const SubmitLoader = () => {
  return (
    <div className="loader submit-loader">
      <SyncOutlined className="spinier" spin />
    </div>
  );
};
