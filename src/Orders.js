import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { Button, Col, Row, Input, Select, Table, Space } from "antd";
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

class Orders extends React.Component {
  render() {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Orders</h2>

        <Table
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={data}
        />
      </>
    );
  }
}

export default Orders;
