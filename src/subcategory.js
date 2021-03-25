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
    title: "Subcategory",
    dataIndex: "subcategory",
    key: "subcategory",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
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
    subcategory: "computers",
    category: "Electronics",
  },
  {
    sn: "2",
    key: "2",
    subcategory: "Phones",
    category: "Electronics",
  },
];

class Subcategory extends React.Component {
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
          Add Subcategory
        </Button>
        <Space></Space>
        {/* table component */}

        <Table
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={data}
        />

        <Drawer
          title="Add Subcategory"
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
                  name="subcategoryname"
                  label="Subcategory Name"
                  rules={[{ required: true, message: "Enter category name" }]}
                >
                  <Input placeholder="Enter category name" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    { required: true, message: "Please select a category" },
                  ]}
                >
                  <Select placeholder="Please select a category">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Subcategory;
