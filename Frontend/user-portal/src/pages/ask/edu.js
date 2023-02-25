import React, { useState, useEffect } from "react";
import { get_departments } from "../../api/department.api";
import { get_dep_subjects } from "../../api/subject.api";
import { openNotification } from "../../utils/functions";
import { Select, Button, Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ask_question } from "../../api/question.api";
import { useUser } from "../../utils/customHooks";
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
const Edu = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState();

  const { user } = useUser();
  const [department, setDepartment] = useState([]);
  const [subjectid, setSubjectid] = useState("");
  const [subject, setSubject] = useState([]);
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
    console.log(values);
    ask();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const ask = async () => {
    let success = false;
    try {
      const response = await ask_question({
        title: values.question.title,
        question: values.question.question,
        userid: user?.id,
        departmentid: values.question.department.value,
        subjectid: values.question.subject.value,
        category: "educational",
      });
      if (response.status === 201) {
        success = true;
        // navigate("/openquestion/1");
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_departments();
        const departmenttData = response.data;
        setDepartment(departmenttData);
        //
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleDidChange = async (e) => {
    try {
      const SubjectResponse = await get_dep_subjects(e.value);
      const RelatedSubjects = SubjectResponse.data;
      setSubject(RelatedSubjects);
    } catch (error) {
      console.log(error);
    }
    console.log(e.value);
  };
  const handleSubjChange = (e) => {
    setSubjectid(e.value);
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
          name={["question", "department"]}
          label="Departments"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            labelInValue
            defaultValue={{
              value: 0,
              label: "choose a department",
            }}
            style={{
              width: 535,
            }}
            onChange={(e) => {
              handleDidChange(e);
            }}
            options={department.map((dept) => ({
              value: dept.id,
              label: `${dept.name}`,
            }))}
          />
        </Form.Item>
        <Form.Item
          name={["question", "subject"]}
          label="Subjects"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            labelInValue
            defaultValue={{
              value: 0,
              label: "choose the related Subject",
            }}
            style={{
              width: 535,
            }}
            onChange={(e) => {
              handleSubjChange(e);
            }}
            options={subject.map((subj) => ({
              value: subj.id,
              label: `${subj.name}`,
            }))}
          />
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

export default Edu;
