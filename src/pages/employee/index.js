import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

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
  Radio,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import FormGenerator from '../../components/FormGenerator';

const { Option } = Select;

const formItems = [
  {
    key: 'fullName',
    name: 'fullName',
    label: 'Full Name',
    rules: [{ required: true, message: 'Please enter full name' }],
    type: <Input placeholder='Please enter full name' />,
  },

  {
    key: 'email',
    name: 'email',
    label: 'Email',

    rules: [{ required: true, message: 'Please enter email' }],
    type: <Input placeholder='Please enter email ' />,
  },
  {
    key: 'phone',
    name: 'phone',
    label: 'Phone',
    rules: [{ required: true, message: 'Please enter Phone' }],
    type: <Input type='text' placeholder='Please enter Phone ' />,
  },
  {
    key: 'adress',
    name: 'adress',
    label: 'Adress',
    type: <Input name='adress' placeholder='Please enter address ' />,
  },
  {
    type: (
      <Select
        defaultActiveFirstOption={false}
        showArrow={true}
        filterOption={false}
        // onChange={handleChange}
        // onSearch={handleSearch}

        // value={values}
        placeholder='Gender'
      >
        <Select.Option value='male' key='male'>
          Male
        </Select.Option>
        <Select.Option value='female' key='female'>
          Female
        </Select.Option>
        <Select.Option value='ohter' key='other'>
          Others
        </Select.Option>
      </Select>
    ),
    key: 'gender',
    label: 'Gender',
    // error: errors.location,
  },
  {
    type: (
      <Radio.Group name='status' defaultValue='active' buttonStyle='solid'>
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
    key: 'status',
    label: 'Status',
    // error: errors.status,
  },

  {
    type: (
      <Radio.Group name='type' defaultValue='false' buttonStyle='solid'>
        <Radio.Button
        // checked={values.status === "active"}
        // value="active"
        >
          Normal
        </Radio.Button>
        <Radio.Button
        //  checked={values.status === "hold"}
        //  value="hold"
        >
          Pickup
        </Radio.Button>
      </Radio.Group>
    ),
    key: 'status',
    label: 'Type',
    // error: errors.status,
  },
];

const columns = [
  {
    title: 'S.N',
    dataIndex: 'sn',
    key: 'sn',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
  },

  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    search: true,
    render: text => <span>{text}</span>,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    // render: (text) => <span>{text === null ? '-' : text}</span>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    // render: (text) => <span>{text === null ? '-' : text}</span>,
  },

  {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },

  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
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
    fullName: 'ab',
    email: 'ab@gmail.com',
    phone: '9888888',
    address: 'butwal',
    type: 'normal',
    status: 'active',
    gender: 'Male',
    subscribed: 'Subscribed',
    role: 'admin',
  },
  {
    sn: '2',
    key: '2',
    fullName: 'John second',
    email: 'ab@gmail.com',
    phone: '99999999',
    type: 'pickup',

    address: 'butwal',

    status: 'Hold',
    gender: 'Female',

    subscribed: 'Not Subscribed',
    role: 'user',
  },
];

class Employees extends React.Component {
  state = {
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/abc.png',
      },
    ],
    gender: '',
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
    return (
      <>
        <Button type='primary' onClick={this.showDrawer}>
          <PlusOutlined /> Add Employee
        </Button>
        <Space></Space>
        {/* table component */}

        <Table
          columns={columns}
          pagination={{ position: ' buttomCenter ' }}
          dataSource={data}
        />
        <Drawer
          title='Add Employee'
          width={400}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type='primary'>
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

export default Employees;
