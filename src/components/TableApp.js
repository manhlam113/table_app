import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Pagination } from "react-bootstrap";
import users from "../users.json";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
const TableApp = () => {
  const [dataUsers, setDataUsers] = useState(users);
  const [currentPage, setCurrentPerPage] = useState(1);

  //Khu vực filterData
  const filterData = (e) => {
    const filterData = [...users].filter(
      (item) =>
        item.firstName.toLowerCase().includes(e.target.value) ||
        item.lastName.toLowerCase().includes(e.target.value) ||
        item.birthday.toLowerCase().includes(e.target.value) ||
        item.email.toLowerCase().includes(e.target.value) ||
        item.gender.toLowerCase().includes(e.target.value) ||
        item.salary.toString().includes(e.target.value) ||
        item.phone.toString().includes(e.target.value)
    );
    setDataUsers(filterData);
    setCurrentPerPage(1);
  };

  //Khu vực sortData
  const sortData = (e) => {
    const sortedData = [...users].sort((a, b) => {
      return a[e.target.value]
        .toString()
        .localeCompare(b[e.target.value].toString(), "en", {
          numeric: true,
        });
    });
    setDataUsers(sortedData);
  };

  //Khu vực Pagination
  const dataPerPage = 10;
  const pageNumber = Math.floor(users.length / dataPerPage);
  const pageStart = currentPage * dataPerPage - dataPerPage;
  const pageEnd = pageStart + dataPerPage - 1;
  const array = Array.from({ length: pageNumber }, (_, i) => i + 1);
  const usersHead = [
    "id",
    "firstName",
    "lastName",
    "email",
    "gender",
    "birthday",
    "salary",
    "phone",
  ];
  return (
    <div className="">
      <h1 className="text-center mb-4 text-primary">A Simple Web App</h1>
      <div className="d-flex justify-content-between">
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ width: "30%", marginRight: "20px" }}
        >
          {/* <Form.Label>What are you finding?</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="What are you finding?"
            onChange={(e) => filterData(e)}
          />
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => sortData(e)}
          style={{ marginBottom: "30px", width: "20%", marginRight: "20px" }}
        >
          <option disabled="disabled">Open this select menu</option>
          <option value="id">ID</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="gender">Gender</option>
          <option value="birthday">Birthday</option>
          <option value="salary">Salary</option>
          <option value="phone">Phone</option>
        </Form.Select>
      </div>
      <Table
        striped
        bordered
        hover
        responsive
        style={{
          boxShadow: "0px 2px 18px 0px rgba(0,0,0,0.5)",
          borderRadius: "10px",
        }}
      >
        <TableHead
          usersHead={usersHead}
          setDataUsers={setDataUsers}
        ></TableHead>
        <TableBody
          Users={dataUsers}
          pageStart={pageStart}
          pageEnd={pageEnd}
        ></TableBody>
      </Table>
      <PaginationTable
        Page={array}
        currentPage={currentPage}
        setCurrentPerPage={setCurrentPerPage}
      ></PaginationTable>
    </div>
  );
};

const TableHead = ({ usersHead, setDataUsers }) => {
  const [isDsc, setIsDsc] = useState(true);
  const [orderby, setOrderby] = useState("id");
  const handleOrderby = (e) => {
    setOrderby(e.target.dataset.value);
    if (orderby === e.target.dataset.value) {
      setIsDsc((isDsc) => !isDsc);
    }
    const sortedData = [...users].sort((a, b) => {
      if (isDsc) {
        if (a[orderby] > b[orderby]) return -1;
      } else {
        if (a[orderby] > b[orderby]) return 1;
      }
    });
    setDataUsers(sortedData);
  };
  return (
    <thead className="bg-primary text-white">
      <tr>
        {usersHead.length > 0 &&
          usersHead.map((item, index) => (
            <th key={index} data-value={item} onClick={handleOrderby}>
              {item.toUpperCase()}
              {orderby === item && isDsc === true ? (
                <FaArrowDown />
              ) : "" || (orderby === item && isDsc === false) ? (
                <FaArrowUp />
              ) : (
                ""
              )}
            </th>
          ))}
      </tr>
    </thead>
  );
};
const TableBody = ({ Users, pageStart, pageEnd }) => {
  function fixPhoneNumber(number) {
    return number.split("-").join("");
  }
  return (
    <tbody>
      {Users.length > 0 &&
        Users.slice(pageStart, pageEnd + 1).map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>
              {new Date(item.birthday).toLocaleDateString("en-GB", {
                timeZone: "UTC",
              })}
            </td>
            <td>{item.salary}</td>
            <td>+84({fixPhoneNumber(item.phone)})</td>
          </tr>
        ))}
    </tbody>
  );
};
const PaginationTable = ({ Page, setCurrentPerPage, currentPage }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Pagination>
        {Page.map((item, index) => (
          <Pagination.Item
            key={index}
            data-page={index + 1}
            onClick={(e) => setCurrentPerPage(e.target.dataset.page)}
            className={currentPage == item ? "active" : ""}
          >
            {item}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};
export default TableApp;
