import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Adms from "./adms";

import Edu from "./edu";
const Askquestion = () => {
  const [basicActive, setBasicActive] = useState("Educational");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  return (
    <div>
      <MDBContainer
        style={{ width: "90%", height: "90%", overflow: "auto" }}
        className="mt-5 mx-5 "
        breakpoint="sm"
      >
        <Breadcrumb style={{ margin: "2px 0" }}>
          <Breadcrumb.Item>
            {" "}
            <h5>
              Ask a question
              <QuestionCircleOutlined style={{ padding: "20px" }} />
            </h5>
          </Breadcrumb.Item>
        </Breadcrumb>

        <MDBTabs className="mb-3" style={{ marginLeft: 350 }}>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("Educational")}
              active={basicActive === "Educational"}
            >
              Educational{" "}
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("Administrative")}
              active={basicActive === "Administrative"}
            >
              Administrative{" "}
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem></MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={basicActive === "Educational"}>
            <Edu></Edu>{" "}
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === "Administrative"}>
            <Adms></Adms>{" "}
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </div>
  );
};

export default Askquestion;
