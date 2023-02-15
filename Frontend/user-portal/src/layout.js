import Header from "./components/header";
import { Outlet } from "react-router-dom";
import SideBar from "./components/sidebar";
import { Layout, theme } from "antd";

const layout = () => {
  const { Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        {<Header />}
        <Content>
          <Layout
            style={{
              padding: "0 0",
              background: colorBgContainer,
              height: "83vh",
            }}
          >
            <SideBar />
            <Outlet />
            {/* <Footer /> */}
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center", height:'17px' }}>
          All rights reserved ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </>
  );
};
export default layout;
