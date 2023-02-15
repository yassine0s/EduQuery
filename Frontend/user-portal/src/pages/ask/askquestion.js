import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Button, Form, Input} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const onFinish = (values) => {
  console.log(values);
};
const askquestion = () => {
  return (
    <div>
      <MDBContainer
        style={{ width: "90%", height: "90%", overflow: "auto" }}
        className="m-5 "
        breakpoint="sm"
      >
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            {" "}
            <h5>
              Ask a question
              <QuestionCircleOutlined style={{ padding: "20px" }} />
            </h5>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            width: "5000px",
            maxWidth: 800,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Departments"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "age"]} label="Subjects">
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "introduction"]}
            label="Questions"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name={["user", "tags"]} label="Tags">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="dashed" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </MDBContainer>
    </div>
  );
};

export default askquestion;
