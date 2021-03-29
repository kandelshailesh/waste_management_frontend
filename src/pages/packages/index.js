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
  Radio,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import FormGenerator from '../../components/FormGenerator';

const { Option } = Select;
const { TextArea } = Input;

const formItems = [
  {
    key: 'packageName',
    name: 'packageName',
    label: 'Package Name',
    rules: [{ required: true, message: 'Please enter package name' }],
    type: <Input placeholder='Please enter package name' />,
  },

  {
    key: 'cost',
    name: 'cost',
    label: 'Cost',

    rules: [{ required: true, message: 'Please enter cost' }],
    type: <Input placeholder='Please enter cost ' />,
  },
  {
    key: 'duration',
    name: 'duration',
    label: 'Duration',
    rules: [{ required: true, message: 'Please enter duration' }],
    type: <Input type='text' placeholder='Please enter duration ' />,
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
        placeholder='Unit'
      >
        <Select.Option value='days' key='days'>
          Days
        </Select.Option>
        <Select.Option value='months' key='months'>
          Months
        </Select.Option>
        <Select.Option value='years' key='years'>
          Years
        </Select.Option>
      </Select>
    ),
    key: 'unit',
    label: 'Unit',
    // error: errors.location,
  },
  {
    key: 'description',
    name: 'description',
    label: 'description',
    rules: [{ required: true, message: 'Please enter description' }],
    type: (
      <TextArea
        className='form-control adjustable-textarea'
        placeholder='Enter description'
      />
    ),
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
];

const columns = [
  {
    title: 'S.N',
    dataIndex: 'sn',
    key: 'sn',
  },
  {
    title: 'Package Name',
    dataIndex: 'packageName',
    key: 'packageName',
    // search: true,
    render: text => <span>{text === null ? '-' : text}</span>,
  },
  {
    title: 'Details',
    dataIndex: 'details',
    key: 'details',
  },

  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
    search: true,
    render: text => <span>{text}</span>,
  },

  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    // render: (text) => <span>{text === null ? '-' : text}</span>,
  },
  {
    title: 'unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
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
    packageName: 'new first package',
    details: 'lorem ipsum de',
    cost: 'Rs 500',
    duration: '6',
    unit: 'month',
    status: 'hold',
  },
  {
    sn: '2',
    key: '2',
    packageName: 'Second package',
    details: 'lorem ipsum de',
    cost: 'Rs 1000',
    duration: '1',
    unit: 'year',
    status: 'active',
  },
];
class Packages extends React.Component {
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
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      multiple: true,
    };

    return (
      <>
        <Button type='primary' onClick={this.showDrawer}>
          <PlusOutlined /> Add package
        </Button>
        <Space></Space>
        {/* table component */}

        <Table
          columns={columns}
          pagination={{ position: ' buttomCenter ' }}
          dataSource={data}
        />
        <Drawer
          title='Add package'
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

export default Packages;
