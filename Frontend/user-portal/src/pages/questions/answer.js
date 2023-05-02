import React , {useState} from "react";
import { Button, Form, Input ,Modal} from "antd";
import { add_answer } from "../../api/answer.api";
import { useUser } from "../../utils/customHooks";
import { openNotification } from "../../utils/functions";

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

const Answer = (questionid) => {
    const { user } = useUser();
    const [values, setValues] = useState();
  const handleAddanswer = async () => {

    let success = false;
    try {
        console.log(values.answer);

      const response = await add_answer({

        questionid: questionid.questionid,
        userid: user.id,
        answer: values.answer.answer,
      });

      if (response.status === 201) {
        success = true;
      }
      openNotification({
        message: "Ask a question",
        description: response.data.message,
        duration: 2,
        type: success ? "success" : "error",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onFinish = (values) => {
    setValues(values);
    showModal();

  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleAddanswer();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
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
      <Form.Item name={["answer", "answer"]}>
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 13,
        }}
      >
        <Button type="dashed" htmlType="submit">
          Add answer
        </Button>
      </Form.Item>
      <Modal
        okType="default"
        title="Ask"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to add this answer?</p>
      </Modal>
    </Form>
    
  );
};

export default Answer;
