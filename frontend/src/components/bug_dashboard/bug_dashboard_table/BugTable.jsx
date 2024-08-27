/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/esm/Container";

const BugTable = ({ bugs, user, handleDeleteBug, handleStatusChange }) => {
  return (
    <Container className="mt-3">
      <Table>
        <thead>
          <tr className="table-light">
            <th>#</th>
            <th>DETAILS</th>
            <th>TYPE</th>
            <th>STATUS</th>
            <th>DUE DATE</th>
            <th>ASSIGNED TO</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {bugs.length > 0 ? (
            bugs.map((bug, index) => (
              <tr key={bug.id}>
                <td>{index + 1}</td>

                <td>
                  <span
                    className={`text-${
                      bug.status === "new"
                        ? "danger"
                        : bug.status === "started"
                        ? "primary"
                        : "success"
                    }`}
                  >
                    <i className="fa-solid fa-circle"></i>
                  </span>{" "}
                  {bug.description.length > 100
                    ? `${bug.description.substring(0, 100)}...`
                    : bug.description}
                </td>

                <td>{bug.type}</td>

                <td>
                  <Badge
                    className={`bg-${
                      bug.status === "new"
                        ? "danger-subtle"
                        : bug.status === "started"
                        ? "primary-subtle"
                        : "success-subtle"
                    }`}
                    text={
                      bug.status === "new"
                        ? "danger"
                        : bug.status === "started"
                        ? "primary"
                        : "success"
                    }
                  >
                    {bug.status}
                  </Badge>
                </td>

                <td>{new Date(bug.deadline).toISOString().split("T")[0]}</td>
                <td>{user && user.username ? user.username : "Loading..."}</td>
                <td>
                  <Dropdown>
                    <DropdownButton
                      title={<i className="fa-solid fa-ellipsis-vertical"></i>}
                    >
                      <Dropdown.Header>
                        <div className="d-flex justify-content-between">
                          <span>Change Setting</span>
                          <i className="fa-solid fa-gear"></i>
                        </div>
                      </Dropdown.Header>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => handleStatusChange(bug.id, "new")}
                      >
                        <Badge bg="danger-subtle" text="danger">
                          New
                        </Badge>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleStatusChange(bug.id, "started")}
                      >
                        <Badge bg="primary-subtle" text="primary">
                          Started
                        </Badge>
                      </Dropdown.Item>
                      {bug.type === "feature" ? (
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(bug.id, "completed")
                          }
                        >
                          <Badge bg="success-subtle" text="success">
                            Completed
                          </Badge>
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item
                          onClick={() => handleStatusChange(bug.id, "resolved")}
                        >
                          <Badge bg="success-subtle" text="success">
                            Resolved
                          </Badge>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => handleDeleteBug(bug.id)}
                        className="text-danger"
                      >
                        <div className="d-flex justify-content-between">
                          <span>Delete</span>
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      </Dropdown.Item>
                    </DropdownButton>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BugTable;
