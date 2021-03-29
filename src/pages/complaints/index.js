import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

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
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const columns = [
  {
    title: 'S.N',
    dataIndex: 'sn',
    key: 'sn',
  },

  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    search: true,
    render: text => <span>{text}</span>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    // render: (text) => <span>{text === null ? '-' : text}</span>,
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
    // render: (text) => <span>{text === null ? '-' : text}</span>,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    // render: (text) => <span>{text === null ? '-' : text}</span>,
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size='middle'>
        <a>Edit {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    sn: '1',
    key: '1',
    title: 'Delay in waste collection timing',
    description: 'lorem ipsum de',
    slug: 'clean-campaign-nepal.html',
    author: 'john doe',
  },
  {
    sn: '2',
    key: '2',
    title: 'Many days gap in between collection  days',
    description: 'lorem ipsum de',
    slug: 'clean-campaign-nepal.html',
    author: 'Tom cruise',
  },
];

class Complaints extends React.Component {
  state = {
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/abc.png',
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

    console.log('data submittion');
  };

  render() {
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      multiple: true,
    };

    return (
      <>
        <h2 style={{ textAlign: 'center' }}>Complaints</h2>
        {/* table component */}

        <Table
          columns={columns}
          pagination={{ position: ' buttomCenter ' }}
          dataSource={data}
        />
      </>
    );
  }
}

export default Complaints;
