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
  DatePicker,
} from 'antd';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import FormGenerator from '../../components/FormGenerator';

const { Option } = Select;
const { TextArea } = Input;

// const onChangeStartDate = (e) => {
//   setValues((a) => ({ ...a, publishedDate: moment(e).format(dateFormat) }));
// };

const formItems = [
  {
    key: 'title',
    name: 'title',
    label: 'Title',
    rules: [{ required: true, message: 'Please enter title' }],
    type: <Input placeholder='Please enter title' />,
  },
  {
    type: (
      <DatePicker
        format='YYYY/MM/DD'
        // allowClear={true}
        // showToday
        // defaultPickerValue={moment(values.publishedDate)}
        // value={moment(values.publishedDate)}
        // onChange={onChangeStartDate}
      />
    ),
    key: 'startDate',
    label: 'start Date',
    // error: errors.publishedDate,
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
];

const columns = [
  {
    title: 'S.N',
    dataIndex: 'sn',
    key: 'sn',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
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
    startDate: '05/05/2021',
    title: 'Cleanliness campaign',
    description: 'lorem ipsum de',
    slug: 'clean-campaign-nepal.html',
  },
  {
    sn: '2',
    key: '2',
    startDate: '01/05/2022',
    title: 'Cleanliness campaign',
    description: 'lorem ipsum de',
    slug: 'clean-campaign-nepal.html',
  },
];

class Events extends React.Component {
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
          <PlusOutlined /> Add Event
        </Button>
        <Space></Space>
        {/* table component */}

        <Table
          columns={columns}
          pagination={{ position: ' buttomCenter ' }}
          dataSource={data}
        />
        <Drawer
          title='Add event'
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

export default Events;
