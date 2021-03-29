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

const FormGenerator = ({ formItems }) => {
  const showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  const onClose = () => {
    this.setState({
      visible: false,
    });

    console.log('data submittion');
  };

  return formItems.map(item => {
    return (
      <Form.Item
        key={item.key}
        name={item.name}
        label={item.label}
        validateStatus={item.error && 'error'}
        help={item.error}
      >
        {item.type}
      </Form.Item>
    );
  });
};
// }

export default FormGenerator;
