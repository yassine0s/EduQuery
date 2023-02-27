import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Card, Space, Checkbox ,Tooltip } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { get_question } from "../../api/question.api";
import Answer from "./answer";
import * as api from "../../api/answer.api";
import { useUser } from "../../utils/customHooks";
import "../../App.css";
import { openNotificationWoRefresh } from "../../utils/functions";
import {
  StarTwoTone
} from "@ant-design/icons";
const Openquestion = () => {
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { user } = useUser();
  const { id } = useParams();
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
 
  const AcceptAnswer = async (aid) => {
    let success = false;

    try {
      console.log(aid);
      const res = await api.accept_answer(aid);
      if (res.status === 200) {
        success = true;
      }
      openNotificationWoRefresh({
        message: "Accept a question",
        description: res.data.message,
        duration: 2,
        type: success ? "success" : "error", 
        onClose: () => {
          console.log("Notification closed.");
        },
      });
    } catch (error) {
      console.log(error);
    }  };
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
          <h5>{question.title}  </h5>
          <MDBRow>
        <MDBCol size='md-1'>
        <StarTwoTone
        style={{ marginLeft: 60, marginTop: 33,fontSize: "120%", color: "gold", cursor: "pointer"}}
        twoToneColor={"gold"}
    />        </MDBCol>
        <MDBCol size='md'>
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
          </Card>        </MDBCol>
      
      </MDBRow>
       
          <h6>Answers</h6>
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <MDBRow key={index}>
                <MDBCol size="md-1">
                  {user?.type === "admin" ? (
                    
                    <Checkbox
                      style={{ marginLeft: 60, marginTop: 33 }}
                      className="custom-checkbox"
                      defaultChecked={answer?.accepted}
                      onChange={()=>{AcceptAnswer(answer?.id)}}
                    ></Checkbox>
                  ) : (
                    <Checkbox
                      disabled
                      style={{ marginLeft: 60, marginTop: 33 }}
                      className="custom-checkbox"
                      defaultChecked={answer?.accepted}
                      value="A"
                    ></Checkbox>
                  )}
                </MDBCol>
                <MDBCol size="md-11">
                  <Card
                    size="large"
                    style={{
                      width: "80vh",
                      minheight: "30vh",
                      marginLeft: "100px",
                      wordWrap: "break-word",
                    }}
                  >
                    <p>{answer?.answer}</p>
                  </Card>{" "}
                </MDBCol>
              </MDBRow>
            ))
          ) : (
            <p style={{ marginLeft: 60 }}>No answers yet.</p>
          )}

          <h6>Add Answer</h6>
          <Answer questionid={id}></Answer>
        </Space>
      </MDBContainer>
    </div>
  );
};

export default Openquestion;
