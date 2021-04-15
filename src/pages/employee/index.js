import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { actionCreator } from "../../reducers/actionCreator";
import { Drawer, Button, Space, notification, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { STRINGS } from "_constants";
import { EmployeeTable } from "./table";
import { EmployeeForm } from "./form";

const Employee = (props) => {
  const title = "Employee";
  const [visible, setvisible] = useState(false);
  const [submitting, setsubmitting] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [data, setData] = useState("");
  const [id, setId] = useState("");
  const showDrawer = () => {
    setvisible(true);
  };
  const onClose = () => {
    setvisible(false);
    setId("");
    setData("");
  };
  const fetch = async () => {
    await props.fetchEmployees();
  };
  const handleDelete = async (id) => {
    const a = await props.deleteEmployee(id);
    if (!a.error) {
      notification.success({
        message: STRINGS.success,
        description: "Delete successfully",
      });
      fetch();
    } else {
      message.error(a.message);
    }
  };

  const handleEdit = (record) => {
    setvisible(true);
    setId(record.id);
    setData(record);
  };

  useEffect(() => {
    if (!visible) fetch();
  }, [visible]);

  return (
    <>
      <Button style={{ marginBottom: 10 }} type="primary" onClick={showDrawer}>
        <PlusOutlined /> Add {title}
      </Button>
      <Space></Space>
      <EmployeeTable
        userData={props.employee}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Drawer
        title={id ? `Edit ${title}` : `Add ${title}`}
        width={400}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              disabled={submitting}
              onClick={() => setclicked(Math.random())}
              type="primary"
            >
              Submit
            </Button>
          </div>
        }
      >
        <EmployeeForm
          setvisible={setvisible}
          setsubmitting={setsubmitting}
          setclicked={setclicked}
          clicked={clicked}
          data={data}
          id={id}
          setData={setData}
          setId={setId}
          {...props}
        />
      </Drawer>
    </>
  );
};

const mapStoreToProps = ({ Employee }) => {
  console.log("state", Employee);
  return {
    employee: Employee.payload,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchEmployees: (param) =>
    dispatch(
      actionCreator({
        method: "GET",
        action_type: "FETCH_EMPLOYEE",
        param,
      })
    ),
  createEmployee: (values) =>
    dispatch(
      actionCreator({
        method: "POST",
        contentType: "JSON",
        action_type: "CREATE_EMPLOYEE",
        values,
      })
    ),
  editEmployee: (id, values) =>
    dispatch(
      actionCreator({
        method: "PATCH",
        id,
        action_type: "EDIT_EMPLOYEE",
        contentType: "JSON",

        values,
      })
    ),
  deleteEmployee: (id) =>
    dispatch(
      actionCreator({
        method: "DELETE",
        id,
        action_type: "DELETE_EMPLOYEE",
      })
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Employee);
