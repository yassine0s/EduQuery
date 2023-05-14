import React from "react";
import {
  HddOutlined,
  QuestionCircleOutlined,
  FileExclamationOutlined,
  PlusCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useUser } from "../utils/customHooks";
import { Link } from "react-router-dom";
import { Layout, Menu, theme, ConfigProvider, Button } from "antd";
const { Sider } = Layout;
const SideBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useUser();

  return (
    <>
      <Sider style={{ background: colorBgContainer }} width={200}>
        <Menu
          mode="inline"
          style={{
            height: "100%",
            backgroundColor: "#EEE9DA",
            padding: "5px",
          }}
        >
          <Menu.Item style={{ color: "black" }} key={1}>
            <Link to="/">
              {" "}
              <HomeOutlined style={{ padding: "5px" }} /> Home
            </Link>
          </Menu.Item>

          <Menu.Item style={{ color: "black" }} key={2}>
            <Link to="/departments">
              {" "}
              <HddOutlined style={{ padding: "5px" }} /> Departments
            </Link>
          </Menu.Item>

          <Menu.Item style={{ color: "black" }} key={3}>
            <Link to="/questions">
              {" "}
              <QuestionCircleOutlined style={{ padding: "5px" }} />
              Questions{" "}
            </Link>
          </Menu.Item>

          {user?.type === "admin" ? (
            <Menu.Item style={{ color: "black" }} key={4}>
              <Link to="/reports">
                <FileExclamationOutlined style={{ padding: "5px" }} />
                Report
              </Link>
            </Menu.Item>
          ) : (
            <></>
          )}
          <Menu.Item style={{ color: "black", marginTop: "50vh" }} key={5}>
            <Link to="/askquestion">
              {" "}
              Ask Question
              <PlusCircleOutlined
                style={{
                  padding: "12px",
                  fontSize: "3vh",
                }}
              />
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};
export default SideBar;
