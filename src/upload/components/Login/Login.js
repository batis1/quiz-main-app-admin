import { useState, useEffect, useContext } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
// import "./Login.css";
import axios from "axios";
import { actions, GlobalContext, SetPopupContext } from "../../../App";
import apiList from "../../../lib/apiList";
import { LoginContainer } from "./LoginSC";
const Login = (props) => {
  const [formStatus, setFormStatus] = useState("idle");
  const { _, dispatch } = useContext(GlobalContext);
  const history = useHistory();
  useEffect(() => {
    if (props.user) {
      history.push("/leaderboard");
    }
  }, []);

  const setPopup = useContext(SetPopupContext);

  const onFinish = async (values) => {
    try {
      console.log({ values });
      setFormStatus("loading");

      const { data } = await axios.post(apiList.login, values);

      console.log({ data });

      if (data.user._doc.role !== "admin") {
        setPopup({
          open: true,
          severity: "error",
          message: `you are not admin you can't login`,
        });
        setFormStatus("failed");

        return;
      }

      setFormStatus("success");
      // props.setUser(data.user);

      dispatch({ type: actions.SET_USER, payload: { user: data.user._doc } });

      window.sessionStorage.setItem(
        "currentUser",
        JSON.stringify(data.user._doc)
      );

      history.push("/");
      setPopup({
        open: true,
        severity: "success",
        message: `logged in successfully`,
      });
    } catch (error) {
      setFormStatus("failed");

      setPopup({
        open: true,
        severity: "error",
        message: `there is something wrong from the backend`,
      });

      console.log(error);
    }
  };
  const buttonValues = {
    idle: {
      text: "Login In",
      loading: false,
      icon: <PlusCircleOutlined />,
    },
    loading: { text: "Logging In", loading: true, icon: null },
    success: {
      text: "You are now logged in",
      loading: false,
      icon: <CheckCircleOutlined />,
    },
    failed: {
      text: "Login Failed",
      loading: false,
      icon: <CloseCircleOutlined />,
    },
  };
  console.log({ formStatus });
  return (
    <div>
      <LoginContainer>
        <Form name="login" onFinish={onFinish} layout="vertical" size="large">
          <h1>Log In</h1>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input a username." }]}
          >
            <Input
              className="form-input-login"
              placeholder="Enter your username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input a password." }]}
          >
            <Input.Password
              className="form-input-login-password"
              placeholder="Enter your password"
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            loading={buttonValues[formStatus].loading}
            icon={buttonValues[formStatus].icon}
            className="LoginAddButton"
          >
            {buttonValues[formStatus].text}
          </Button>
        </Form>
      </LoginContainer>
    </div>
  );
};

export default Login;
