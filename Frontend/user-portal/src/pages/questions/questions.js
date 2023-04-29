import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBPagination,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { get_questions,report_question } from "../../api/question.api";
import { openNotificationWoRefresh } from "../../utils/functions";
import { Avatar } from "antd";
import { get_user } from "../../api/user.api";
import {
  StarTwoTone,
  IssuesCloseOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Tooltip, Input, Modal } from "antd";

const Questions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [report, setReport] = useState("");
  const [reportedQ, setReportedQ] = useState();

  const [pages, setPages] = useState({
    currentPage: 1,
    questionsPerPage: 3,
  });
  const handlePageClick = (page) => {
    setPages({ ...pages, currentPage: page });
  };
  const [questions, setQuestions] = useState([]);
  const totalPages = Math.ceil(questions.length / pages.questionsPerPage);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
   
    let success = false;
    try {
      const response = await report_question(reportedQ.id,{report:report});
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleReport =  (reportedQ) => {
    showModal();
    setReportedQ(reportedQ)
 
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_questions();
        const questionsData = response.data;
        // Get the user IDs from questionsData
        const userIds = questionsData.map((question) => question.userid);

        // Make an API call to get the users
        const usersResponse = await Promise.all(
          userIds.map((userId) => get_user(userId))
        );

        const usersData = usersResponse.map((response) => response.data);

        // Merge the questionsData and usersData arrays
        const mergedData = questionsData.map((question, index) => ({
          ...question,
          firstname: usersData[index].firstname,
          lastname: usersData[index].lastname,
          email: usersData[index].email,
        }));

        setQuestions(mergedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const [filterValue, setFilterValue] = useState("");
  const { TextArea } = Input;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(filterValue.toLowerCase())
  );
  const startIndex = (pages.currentPage - 1) * pages.questionsPerPage;
  const endIndex = startIndex + pages.questionsPerPage;
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex);

  return (
    <div
      style={{
        width: "100%",
        margin: "20px",
        maxHeight: "100vh",
        overflow: "auto",
      }}
    >
      <h2 className="mt-5" style={{ marginLeft: "26px", fontSize: "26px", fontWeight: "bold" }}>List of questions</h2>

      <Input.Group
        style={{ marginLeft: 350, marginTop: 40, marginBottom: 40, width: 900 }}
        compact
      >
        <Input
          style={{
            width: "50%",
          }}
          placeholder="Filter by question title"
          defaultValue="Xihu District, Hangzhou"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
        />
      </Input.Group>
      <div>
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Question</th>
              <th scope="col">User</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Flags</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentQuestions.map((question, index) => (
              <tr key={index} >
                <td>
                  <p className="fw-normal mb-1 ">
                    <Link to={`/openquestion/${question?.id}`}>
                      <div
                        style={{
                          color: "black",
                          overflow: "hidden",
                          maxWidth: 400,
                        }}
                      >
                        {question.title}
                      </div>
                    </Link>
                  </p>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                  <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {question.firstname} {question.lastname}
                      </p>
                      <p className="text-muted mb-0">{question.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  {question.category === "administrative" ? (
                    <MDBBadge className="mx-2" color="info" light>
                      {question.category}
                    </MDBBadge>
                  ) : (
                    <MDBBadge className="mx-2" color="success">
                      {question.category}
                    </MDBBadge>
                  )}
                </td>
                <td>{new Date(question.date).toLocaleDateString()}</td>
                <td>
                  {question.important ? (
                    <Tooltip title={"Important"} color={"gold"}>
                      <StarTwoTone
                        style={{
                          fontSize: "120%",
                          color: "gold",
                          cursor: "pointer",
                        }}
                        // onClick={handleImportant}
                        twoToneColor="gold"
                      />{" "}
                    </Tooltip>
                  ) : (
                    <></>
                  )}{" "}
                  {question.closed ? (
                    <Tooltip title={"closed"} color={"grey"}>
                      <IssuesCloseOutlined
                        style={{
                          fontSize: "120%",
                          cursor: "pointer",
                        }}
                      />{" "}
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                  <Tooltip className="m-1" title={"report"} color={"red"}>
                    <WarningOutlined
                      style={{
                        fontSize: "120%",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={()=>{handleReport(question)}}
                      twoToneColor="gold"
                    />{" "}
                  </Tooltip>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>{" "}
        <MDBPagination style={{ marginLeft: 500 }}>
          <MDBPaginationItem
            disabled={pages.currentPage === 1}
            onClick={() => handlePageClick(pages.currentPage - 1)}
          >
            <MDBPaginationLink>Previous</MDBPaginationLink>
          </MDBPaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <MDBPaginationItem
              key={i}
              active={i + 1 === pages.currentPage}
              onClick={() => handlePageClick(i + 1)}
            >
              <MDBPaginationLink>{i + 1}</MDBPaginationLink>
            </MDBPaginationItem>
          ))}
          <MDBPaginationItem
            disabled={pages.currentPage === totalPages}
            onClick={() => handlePageClick(pages.currentPage + 1)}
          >
            <MDBPaginationLink>Next</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      </div>
      <Modal
        okType="default"
        title="Report"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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

export default Questions;
