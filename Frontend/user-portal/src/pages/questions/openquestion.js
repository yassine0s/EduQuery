import React, { useEffect,useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Card, Space } from "antd";
import { Button, Form, Input } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { get_question } from "../../api/question.api";
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
const Openquestion = () => {


  const [question, setQuestion] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_question(id);
        const questionData = response.data;
        console.log(questionData[0])
        setQuestion(questionData[0]);
        //
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <MDBContainer
        style={{ width: "90%", height: "90%", overflow: "auto" }}
        className="m-5 "
        breakpoint="sm"
      >
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <h5>{question.title}</h5>
          <Card
            size="large"
            style={{
              width: "120vh",
              minheight: "30vh",
              marginLeft: "50px",
              wordWrap: "break-word",
            }}
          >
            <p> {question.question}</p>
          </Card>
          <h6>Answers</h6>
          <Card
            size="large"
            style={{
              width: "80vh",
              minheight: "30vh",
              marginLeft: "100px",
              wordWrap: "break-word",
            }}
          >
            <p> content</p>
          </Card>
          <h6>Add Answer</h6>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
              marginLeft: "100px",
              width: "120vh",
              maxWidth: 1000,
            }}
            validateMessages={validateMessages}
          >
            <Form.Item name={["user", "introduction"]}>
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 13,
              }}
            >
              <Button type="dashed" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </MDBContainer>
    </div>
  );
};

export default Openquestion;
