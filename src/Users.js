import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  InputNumber,
  Upload,
  Table,
  Space,
  Radio,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import FormGenerator from "./components/FormGenerator";
import imgOne from "./images/first.jpg";
import imgTwo from "./images/barista1.jpg";
const text = "hello";
const formItems = [
  {
    key: "fullName",
    name: "fullName",
    label: "Full Name",
    rules: [{ required: true, message: "Please enter full name" }],
    type: <Input placeholder="Please enter full name" />,
  },
  {
    key: "userName",
    name: "userName",
    label: "Username",

    rules: [{ required: true, message: "Please enter user name" }],
    type: <Input placeholder="Please enter user name" />,
  },
  {
    key: "email",
    name: "email",
    label: "Email",

    rules: [{ required: true, message: "Please enter email" }],
    type: <Input placeholder="Please enter email " />,
  },
  {
    key: "phone",
    name: "phone",
    label: "Phone",
    rules: [{ required: true, message: "Please enter Phone" }],
    type: <Input type="text" placeholder="Please enter Phone " />,
  },
  {
    type: (
      <Radio.Group name="status" defaultValue="active" buttonStyle="solid">
        <Radio.Button
        // checked={values.status === "active"}
        // value="active"
        >
          Active
        </Radio.Button>
        <Radio.Button
        //  checked={values.status === "hold"}
        //  value="hold"
        >
          Hold
        </Radio.Button>
      </Radio.Group>
    ),
    key: "status",
    label: "Status",
    // error: errors.status,
  },
  {
    type: (
      <Radio.Group name="subscribed" defaultValue="false" buttonStyle="solid">
        <Radio.Button
        // checked={values.status === "active"}
        // value="active"
        >
          Subscribed
        </Radio.Button>
        <Radio.Button
        //  checked={values.status === "hold"}
        //  value="hold"
        >
          Not subscribed
        </Radio.Button>
      </Radio.Group>
    ),
    key: "status",
    label: "Status",
    // error: errors.status,
  },
];

const { Option } = Select;

const columns = [
  {
    title: "S.N",
    dataIndex: "sn",
    key: "sn",
  },
  // {
  // title: "Full Name",
  // dataIndex: "fullName",
  // key: "fullName",
  // render: (_, record) => (
  //   <span>
  //     {record.firstName !== null ? record.firstName : "-"}&nbsp;
  //     {record.lastName}
  //   </span>
  // ),
  // },
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
    render: (text) => <span>{text === null ? "-" : text}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    search: true,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    // render: (text) => <span>{text === null ? '-' : text}</span>,
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Subscribed",
    dataIndex: "subscribed",
    key: "subscribed",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Profile",
    dataIndex: "profileImage",
    key: "profileImage",
    render: (text, record) => (
      <Link to={`/createuser/edit/${record.id}`} className="thumbnail-area">
        {/* <div className="image-view"> */}

        <img
          style={{ width: "55px", height: "auto", objectFit: "contain" }}
          className="image-view"
          src={record.profileImage}
          alt="Profile image"
        />
        {/* </div> */}
      </Link>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Edit {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    sn: "1",
    key: "1",
    // fullName: "ab",
    username: "John first",
    email: "ab@gmail.com",
    phone: "9888888",
    status: "active",
    subscribed: "Subscribed",
    profileImage: imgOne,
    role: "admin",
  },
  {
    sn: "2",
    key: "2",
    username: "John second",
    email: "ab@gmail.com",
    phone: "99999999",
    status: "Hold",
    subscribed: "Not Subscribed",
    profileImage: imgTwo,
    role: "user",
  },
];

class Users extends React.Component {
  state = {
    fileList: [
      {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: "http://www.baidu.com/abc.png",
      },
    ],
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });

    console.log("data submittion");
  };

  render() {
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: true,
    };

    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> Add User
        </Button>
        <Space></Space>
        {/* table component */}

        <Table
          columns={columns}
          pagination={{ position: " buttomCenter " }}
          dataSource={data}
        />
        {/* <img src={imgOne} /> */}
        {/* {console.log("image one", imgOne)} */}
        <Drawer
          title="Add User"
          width={400}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <FormGenerator formItems={formItems} />
        </Drawer>
      </>
    );
  }
}

export default Users;
