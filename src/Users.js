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
    title: "Product Name",
    dataIndex: "productname",
    key: "productname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Product Id",
    dataIndex: "productid",
    key: "productid",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Subcategory",
    dataIndex: "subcategory",
    key: "subcategory",
  },
  {
    title: "rate",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
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
    productname: "dell  laptop",
    productid: 111,
    brand: "dell",
    category: "electronics",
    subcategory: "computers",
    rate: 90000,
    quantity: 12,
  },
  {
    sn: "2",
    key: "2",
    productname: "Jim Green",
    productid: 222,
    brand: "dell",
    category: 42,
    subcategory: "Le Park",
    rate: 99000,
    quantity: 10,
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
        <Drawer
          title="Add Product"
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="productname"
                  label="Product Name"
                  rules={[
                    { required: true, message: "Please enter product name" },
                  ]}
                >
                  <Input placeholder="Please enter product name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="imagebase" label="Image">
                  <Upload {...props} fileList={this.state.fileList}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    { required: true, message: "Please select an owner" },
                  ]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="subcategory"
                  label="Subcategory"
                  rules={[
                    { required: true, message: "Please select a subcategory" },
                  ]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="brand"
                  label="Brand"
                  rules={[
                    { required: true, message: "Please choose the approver" },
                  ]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="rate"
                  label="Rate"
                  rules={[{ required: true, message: "Please enter rate" }]}
                >
                  <Input placeholder="Please enter rate" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[{ required: true, message: "Please enter quantity" }]}
                >
                  <InputNumber min={1} defaultValue={1} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="minorder"
                  label="Min order"
                  rules={[{ required: true, message: "Please enter rate" }]}
                >
                  <InputNumber min={1} defaultValue={1} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "please enter product description",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter product description"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Users;
