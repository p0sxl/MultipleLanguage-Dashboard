import { useEffect, useState } from "react";
import bgsvg from "../static/bg.svg";
import { Card, Form, Input, Button, message } from "antd";
import SessionModel from "../models/SessionModel";
import {setAccount, setToken} from '../store/account';
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { encode, decode } from 'js-base64';
import { useNavigate } from "react-router";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (e) => {
    const result = await SessionModel.login(e.email, e.password);
    if(result.status == 'true') {
      dispatch(setToken(result.token));
      dispatch(setAccount(result.account));
      Cookies.set('token',result.token);
      Cookies.set('account',encode(JSON.stringify(result.account)));
      navigate('/');
    }else if(result.status == 'false'){
      message.info(result.message);
    }else {
      message.warning("System error")
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bgsvg})` }}
    >
      <Card>
        <Form onFinish={(e) => login(e)} layout={"vertical"}>
          <Form.Item label="E-Mail" name="email">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
