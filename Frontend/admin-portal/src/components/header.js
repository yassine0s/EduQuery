import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { Modal } from "antd";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { instance } = useMsal(); // const { accounts } = useMsal();
  // const account = accounts[0];
  //   const name = account?.name ?? "";
  const [showNavColor, setShowNavColor] = useState(false);
  const handleLogout = () => {
    instance
      .logoutPopup({
        postLogoutRedirectUri: "/login",
        mainWindowRedirectUri: "/login",
      })
      .catch((error) => console.log(error));
    navigate("/login");
  };
  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/home">
          {" "}
          <img
            src="../bme.svg"
            alt=""
            style={{ width: "100px", height: "35px" }}
          />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavColor(!showNavColor)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColor} navbar id="navbarColor02">
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <MDBNavbarItem className="active">
              <MDBNavbarLink aria-current="page" href="/home">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/users">Users</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/departments">Departments</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/subjects">Subjects</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0 d-flex justify-content-end">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    className="nav-link d-flex align-items-center"
                    href="#"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img(31).webp"
                      className="rounded-circle"
                      height="32"
                      alt="Avatar"
                      loading="lazy"
                    />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <MDBNavbarLink onClick={() => setOpen(true)}>
                        {" "}
                        Details
                      </MDBNavbarLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <MDBNavbarLink onClick={handleLogout}>
                        Logout
                      </MDBNavbarLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
      <Modal
      okType='default'
        title="User Details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
      >
        <p className="mt-3">User Name: Yassine</p>
        <p >Full name: Yassine Mrabet</p>
        <p>Email: yassinetoos@gmail.com</p>
      </Modal>
    </MDBNavbar>
  );
};

export default Header;
