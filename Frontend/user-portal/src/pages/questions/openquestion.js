import React, { useEffect,useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Card, Space } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { get_question } from "../../api/question.api";
import Answer from "./answer";
import { get_answers } from "../../api/answer.api";
const Openquestion = () => {

  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_question(id);
        const questionData = response.data;
        setQuestion(questionData[0]);

        const asresponse = await get_answers(id);
        const answerData = asresponse.data;
        console.log(answerData)
        setAnswers(answerData);
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
          {answers.length > 0 ? (
  answers.map((answer, index) => (
    <Card
      key={index}
      size="large"
      style={{
        width: "80vh",
        minheight: "30vh",
        marginLeft: "100px",
        wordWrap: "break-word",
      }}
    >
      <p>{answer?.answer}</p>
    </Card>
  ))
) : (
  <p>No answers yet.</p>
)}

          <h6>Add Answer</h6>
        <Answer questionid = {id}></Answer>
        </Space>
      </MDBContainer>
    </div>
  );
};

export default Openquestion;
