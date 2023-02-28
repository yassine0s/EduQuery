import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBPagination,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { get_questions } from "../../api/question.api";
import { get_user } from "../../api/user.api";
import { StarTwoTone, IssuesCloseOutlined } from "@ant-design/icons";
import { Tooltip,AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
   } from "antd";
   const { Option } = Select;

const Questions = () => {
  const [pages, setPages] = useState({
    currentPage: 1,
    questionsPerPage: 4,
  });
  const handlePageClick = (page) => {
    setPages({ ...pages, currentPage: page });
  };
  const [questions, setQuestions] = useState([]);
  const totalPages = Math.ceil(questions.length / pages.questionsPerPage);

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
     <h5 className="m-2">List of questions</h5>

     <Input.Group style={{marginLeft:350,marginTop:40,marginBottom:40,width:900}} compact>
      <Input
        style={{
          width: '50%',
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
              <tr>
                <td>
                  <p style={{}} className="fw-normal mb-1 ">
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
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
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
    </div>
  );
};

export default Questions;
