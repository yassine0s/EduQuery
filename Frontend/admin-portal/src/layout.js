import Header from "./components/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {<Header />}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};
export default Layout;
