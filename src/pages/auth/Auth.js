import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import GoogleRecaptcha from "../../components/form/GoogleRecaptcha";
import "../../styles/auth.scss";

import { AuthContext } from "../../contexts/AuthContext";
import { onFinish, onFinishFailed } from "./AuthActions";
import { Text } from "../../contexts/LanguageContext";

const Auth = () => {
  const navigate = useNavigate();
  const { authDispatch } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  return (
    <div className="auth">
      <div className="title">
        <Text tid="login_title" />
      </div>

      <Form
        className="form"
        name="login"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={{}}
        onFinish={(values) => onFinish(values, navigate, authDispatch, setLoader)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label=<Text tid="username" /> name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label=<Text tid="password" /> name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="reacaptcha">
          <GoogleRecaptcha />
        </Form.Item>

        <div className="submit">
          <Button type="secondary" htmlType="submit" disabled={loader}>
            {loader ? (
              <span>
                <SyncOutlined spin /> Submitting
              </span>
            ) : (
              <Text tid="login" />
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Auth;
