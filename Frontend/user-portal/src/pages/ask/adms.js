import React, { useState, useEffect } from "react";
import { openNotification } from "../../utils/functions";
import { Button, Form, Input,Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/customHooks";

import {ask_question} from '../../api/question.api'

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

const Adms = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const [values,setValues]= useState()
    const onFinish = (values) => {
        setValues(values)
        showModal()
      };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
      console.log(values);
      ask()
        };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const ask = async () => {
        let success = false;
        try {
          const response = await ask_question({
            title: values.question.title,
            question:  values.question.question,
            userid: user?.id,
            category: 'administrative',

          });
          if (response.status === 201) {
            success = true;
            navigate(`/openquestion/${response.data.data}`);
          }
    
          openNotification({
            message: "Ask a question",
            description: response.data.message,
            duration: 2,
            type: success ? "success" : "error",
          });
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
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
          name={["question", "title"]}
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
          name={["question", "question"]}
          label="Questions"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={4} />
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
      <Modal
        okType="default"
        title="Ask"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to add this question?</p>
      </Modal>
    </div>
  );
};

export default Adms;
