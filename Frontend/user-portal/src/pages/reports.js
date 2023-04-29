import { Avatar, List } from "antd";
import { MDBContainer } from "mdb-react-ui-kit";
import { get_reports, get_question } from "../api/question.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_reports();
        const reportsData = response.data;
        setReports(reportsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionIds = reports.map((report) => report.questionid);
      const questionPromises = questionIds.map((questionId) =>
        get_question(questionId)
      );
      const questionResponses = await Promise.all(questionPromises);
      const questionData = questionResponses.map(
        (response) => response.data[0]
      );
      setQuestions(questionData);
      console.log(questionData);
    };

    fetchQuestions();
  }, [reports]);

  return (
    <MDBContainer
      style={{ width: "90%", height: "90%", overflow: "auto" }}
      className="m-5 "
      breakpoint="sm"
    >
  <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ marginRight: "16px", fontSize: "36px", fontWeight: "bold" }}>Reports</h2>
      </div>      <List
        itemLayout="horizontal"
        dataSource={reports}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "16px" }}>Report on Question:</span>
                  <Link to={`/openquestion/${questions[index]?.id}`}>
                    {questions[index]?.title || "Loading question..."}
                  </Link>
                </div>
              }
              description={item.report}
            />
          </List.Item>
        )}
      />
    </MDBContainer>
  );
};

export default Reports;
