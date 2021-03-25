import React, { useState } from "react";
import ReactDOM from "react-dom";
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
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const columns = [
  {
    title: "S.N",
    dataIndex: "sn",
    key: "sn",
  },

  {
    title: "Category Name",
    dataIndex: "categoryname",
    key: "categoryname",
    render: (text) => <a>{text}</a>,
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
    categoryname: "Electronics",
  },
  {
    sn: "2",
    key: "2",
    categoryname: "Clothes",
  },
];

class Category extends React.Component {
  state = {
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
          <PlusOutlined />
          Add Category
        </Button>
        <Space></Space>
        {/* table component */}

        <Table
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={data}
        />

        <Drawer
          title="Add Category"
          width={250}
          onClose={this.onClose}
          visible={this.state.visible}
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="categoryname"
                  label="Category Name"
                  rules={[{ required: true, message: "Enter category name" }]}
                >
                  <Input placeholder="Enter category name" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Category;
