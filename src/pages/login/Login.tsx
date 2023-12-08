import { Button, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import { LoginContainer } from "./loginStyle";
import bg from "../../static/images/logo/VETC_1.png";
import { setTitle } from "../../helper/functionCommon";
import { getAuthorStore, loginEim } from "../../store/auth/auth";
import { LoginOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Login() {
  const dispatch = useAppDispatch();
  const { loadding } = useAppSelector(getAuthorStore);

  const onFinish = (dataForm: any) => {
    dispatch(loginEim(dataForm));
  };

  useEffect(() => {
    setTitle("Admin - Đăng nhập");
  }, []);

  return (
    <LoginContainer>
      <div className="form-container">
        <div className="bg-image">
          <img src={bg} alt="login-background" />
        </div>
        <div className="form">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            labelAlign="left"
            colon={false}
          >
            <Title className="title" level={4}>Trang quản trị ví điện tử</Title>
            <Form.Item
              label=""
              name="username"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Tên đăng nhập không để trống!" }]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>

            <Form.Item
              label=""
              name="password"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Mật khẩu không để trống!" }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <div className="button">
              <Button
                type="primary"
                htmlType="submit"
                loading={loadding}
                icon={<LoginOutlined />}
              >
                Đăng nhập
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </LoginContainer>
  );
}
