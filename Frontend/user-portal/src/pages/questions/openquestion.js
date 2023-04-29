import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Button, Card, Space, Checkbox,Input, Tooltip, Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  get_question,
  important_question,
  delete_question,
  close_question,
} from "../../api/question.api";
import Answer from "./answer";
import * as api from "../../api/answer.api";
import { useUser } from "../../utils/customHooks";
import "../../App.css";
import {
  openNotificationWoRefresh,
  openNotification,
} from "../../utils/functions";
import { report_question } from "../../api/question.api";
import { StarTwoTone } from "@ant-design/icons";

const Openquestion = () => {
  const [report, setReport] = useState("");
  const [reportedQID, setReportedQ] = useState();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { user } = useUser();
  const { id } = useParams();
  const [close, setClosed] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_question(id);
        const questionData = response.data;
        setQuestion(questionData[0]);

        const asresponse = await api.get_answers(id);
        const answerData = asresponse.data;

        setAnswers(answerData);
        //
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { TextArea } = Input;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleDelete();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
    setClosed(!close);
    console.log(close);
    handleClose();
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const showModal3 = () => {
    setIsModalOpen3(true);
  };
  const handleOk3 = async () => {
    setIsModalOpen3(false);
    let success = false;
    try {
      const response = await report_question(reportedQID,{report:report});
      if (response.status === 201) {
        success = true;
      }
      openNotificationWoRefresh({
        message: "report a question",
        description: response.data.message,
        duration: 2,
        type: success ? "success" : "error",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };
  const handleReport =  (reportedQID) => {
    showModal3();
    setReportedQ(reportedQID)
  };
  const AcceptAnswer = async (aid) => {
    let success = false;
    try {
      const res = await api.accept_answer(aid);
      if (res.status === 200) {
        success = true;
      }
      openNotificationWoRefresh({
        message: "Accept answer",
        description: res.data.message,
        duration: 2,
        type: success ? "success" : "error",
        onClose: () => {
          console.log("Notification closed.");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleImportant = async () => {
    let success = false;
    try {
      const res = await important_question(id);
      if (res.status === 200) {
        success = true;
      }
      openNotification({
        message: "important question",
        description: res.data.message,
        duration: 2,
        type: success ? "success" : "error",
        onClose: () => {
          console.log("Notification closed.");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = async () => {
    let success = false;
    try {
      const res = await close_question(id);
      if (res.status === 200) {
        success = true;
      }
      openNotification({
        message: "question closure",
        description: res.data.message,
        duration: 2,
        type: success ? "success" : "error",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    let success = false;
    try {
      const res = await delete_question(id);
      if (res.status === 200) {
        success = true;
        navigate("../questions");
      }
      openNotification({
        message: "delete question",
        description: res.data.message,
        duration: 2,
        type: success ? "success" : "error",
        onClose: () => {
          console.log("Notification closed.");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <MDBContainer
        style={{ width: "117%", height: "90%", overflow: "auto" }}
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
          {" "}
          <MDBRow>
            <MDBCol size="md-10">
              {" "}
              <h5>{question.title} </h5>
            </MDBCol>{" "}
            {user?.type === "admin" ? (
              <MDBCol size="md-1">
                {" "}
                <Button type="primary" danger onClick={showModal}>
                  Delete
                </Button>
              </MDBCol>
            ) : (
              <MDBCol size="md-1"> </MDBCol>
            )}
          </MDBRow>
          <MDBRow>
            {user?.type === "admin" ? (
              <MDBCol size="md-1">
                {question.important === 1 ? (
                  <Tooltip title={"Make Unimportant"} color={"red"}>
                    <StarTwoTone
                      style={{
                        marginTop: 33,
                        fontSize: "120%",
                        color: "gold",
                        cursor: "pointer",
                      }}
                      onClick={handleImportant}
                      twoToneColor="red"
                    />{" "}
                  </Tooltip>
                ) : (
                  <Tooltip title={"make Important"} color={"gold"}>
                    <StarTwoTone
                      style={{
                        marginTop: 33,
                        fontSize: "120%",
                        color: "gold",
                        cursor: "pointer",
                      }}
                      onClick={handleImportant}
                      twoToneColor="gold"
                    />{" "}
                  </Tooltip>
                )}
              </MDBCol>
            ) : (
              <MDBCol size="md-1">
                {question.important ? (
                  <Tooltip title={"Important"} color={"red"}>
                    <StarTwoTone
                      style={{
                        marginTop: 33,
                        fontSize: "120%",
                        color: "gold",
                        cursor: "pointer",
                      }}
                      twoToneColor="red"
                    />
                  </Tooltip>
                ) : (
                  <StarTwoTone
                    style={{
                      marginTop: 33,
                      fontSize: "120%",
                      color: "gold",
                      cursor: "pointer",
                    }}
                    twoToneColor="gold"
                  />
                )}
              </MDBCol>
            )}
            <MDBCol size="md">
              <Card
                size="large"
                style={{
                  width: "120vh",
                  minheight: "30vh",
                  wordWrap: "break-word",
                }}
              >
                <p> {question.question}</p>
              </Card>{" "}
            </MDBCol>
          </MDBRow>
          <h6>Answers</h6>
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <MDBRow key={index}>
                <MDBCol size="md-1">
                  {user?.type === "admin" ? (
                    <Tooltip title={"accept or unaccept"} color={"green"}>
                      <Checkbox
                        style={{ marginTop: 33 }}
                        className="custom-checkbox"
                        defaultChecked={answer?.accepted}
                        onChange={() => {
                          AcceptAnswer(answer?.id);
                        }}
                      ></Checkbox>{" "}
                    </Tooltip>
                  ) : (
                    <Checkbox
                      disabled
                      style={{ marginTop: 33 }}
                      className="custom-checkbox"
                      defaultChecked={answer?.accepted}
                    ></Checkbox>
                  )}
                </MDBCol>
                <MDBCol size="md-11">
                  <Card
                    size="large"
                    style={{
                      width: "80vh",
                      minheight: "30vh",
                      marginLeft: "50px",
                      wordWrap: "break-word",
                    }}
                  >
                    <p>{answer?.answer}</p>
                  </Card>{" "}
                </MDBCol>
              </MDBRow>
            ))
          ) : (
            <div style={{ marginLeft: 60 }}>No answers yet.</div>
          )}
          {question?.closed ? (
            <>
              {user?.type === "admin" ? (
                <>
                  {!question.closed ? (
                    <Button default onClick={showModal2}>
                      Close question
                    </Button>
                  ) : (
                    <Button default onClick={showModal2}>
                      Open question
                    </Button>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {" "}
              <h6>Add Answer</h6>
              <Answer questionid={id}></Answer>
              {user?.type === "admin" ? (
                <>
                  {!question.closed ? (
                    <Button default onClick={showModal2}>
                      Close question
                    </Button>
                  ) : (
                    <Button default onClick={showModal2}>
                      Open question
                    </Button>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          )}
            <Button default onClick={()=>{handleReport(id)}}>
                      Report question
                    </Button>
        </Space>
      </MDBContainer>
      <Modal
        okType="default"
        title="Ask"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this question?</p>
      </Modal>
      <Modal
        okType="default"
        title="Ask"
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        {question.closed === 0 ? (
          <p>Are you sure you want to close this question?</p>
        ) : (
          <p>Are you sure you want to open this question?</p>
        )}
      </Modal>
      <Modal
        okType="default"
        title="Report"
        centered
        open={isModalOpen3}
        onOk={handleOk3}
        onCancel={handleCancel3}
        width={500}
      >
        <TextArea
          onChange={(e) => setReport(e.target.value)}
          rows={4}
          placeholder="Enter your report message"
          maxLength={60}
        />
      </Modal>
    </div>
  );
};

export default Openquestion;
