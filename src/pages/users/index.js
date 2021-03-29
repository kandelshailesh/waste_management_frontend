import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
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
  notification,
  message,
  Tooltip,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  DeleteFilled,
  EditFilled,
} from '@ant-design/icons';
import useFormValidation from 'hooks/useFormValidation';
import { STRINGS } from '_constants';
import useFetching from 'hooks/useFetching';
import useUpload from 'hooks/useUpload';
import FormGenerator from '../../components/FormGenerator';
import { UserSchema } from '../../_utils/Schemas';
import isEmpty from 'lodash/isEmpty';
import {
  formItemLayout,
  tailFormItemLayout,
  getBaseName,
  getFormData,
} from '../../_utils/index';

const Users = props => {
  const [visible, setvisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState('');
  const [id, setId] = useState('');
  const initialValues = {
    // fullName: '',
    // email: '',
    // password: '',
    // phone: '',
    // address: '',
    // subscribed: false,
    // status: 'active',
    // activation_date: '',
    // renewal_date: '',
    // subscription_id: '',
  };

  const showDrawer = () => {
    setvisible(true);
  };

  const onClose = () => {
    setvisible(false);
  };

  const fetch = async () => {
    await props.fetchUsers();
  };
  const handleDelete = async id => {
    const a = await props.deleteUser(id);
    if (!a.error) {
      notification.success({
        message: STRINGS.success,
        description: 'Delete successfully',
      });
      fetch();
    } else {
      message.error(a.message);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  const {
    onChange: onChangeMain,
    onRemove: onRemoveMain,
    beforeUpload: beforeUploadMain,
    fileList: fileListMain,
    setFileList: setFileListMain,
  } = useUpload(1);

  const propsMainImage = {
    listType: 'picture',
    onChange: onChangeMain,
    onRemove: onRemoveMain,
    beforeUpload: beforeUploadMain,
    fileList: fileListMain,
  };

  const submitForm = () => {
    try {
      console.log('will submitform', values);
      fetchSubmit();
    } catch (err) {
      setSubmitting(false);
    }
  };
  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
  } = useFormValidation(initialValues, UserSchema, submitForm);

  //   useEffect(() => {
  //     console.log(values, errors);
  //   }, [values, errors]);
  useEffect(() => {
    console.log('done', data);
    if (!isEmpty(data)) {
      const image = [
        {
          uid: '-1',
          url: data.image,
          name: getBaseName(data.image),
          thumbUrl: data.image,
        },
      ];
      setFileListMain(image);
      setValues({
        ...data,
        // image: image,
        fullName: data.fullName,
      });
      console.log('values', values);
    }
  }, [data]);

  useEffect(() => {
    if (fileListMain) setValues(a => ({ ...a, image: fileListMain }));
  }, [fileListMain]);
  const fetchSubmit = async () => {
    setSuccess(false);
    console.log('Values', values);
    const formData = await getFormData(values);
    if (values?.image && values?.image[0]?.originFileObj) {
      formData.append('delete_profile', data.deleteImage);
    }
    const a = data
      ? await props.editUser(data.id, formData)
      : await props.createUser(formData);
    console.log('a', a);
    setSubmitting(false);
    if (!a.error) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      });
      setvisible(false);
    } else {
      message.error(a.message);
    }
  };
  const formItems = [
    {
      label: 'Image',
      error: errors.image,
      key: 'image',
      name: 'image',
      type: (
        <>
          <Upload listType='picture-card' name='image' {...propsMainImage}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <UploadOutlined /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
    {
      key: 'fullName',
      name: 'fullName',
      label: 'Full Name',
      rules: [{ required: true, message: 'Please enter full name' }],
      type: (
        <Input
          name='fullName'
          value={values.fullName}
          placeholder='Please enter full name'
        />
      ),
      error: errors.fullName,
    },
    {
      key: 'username',
      name: 'username',
      label: 'Username',
      rules: [{ required: true, message: 'Please enter user name' }],
      type: (
        <Input
          value={values.username}
          name='username'
          placeholder='Please enter user name'
        />
      ),
      error: errors.username,
    },

    {
      key: 'email',
      name: 'email',
      label: 'Email',
      rules: [{ required: true, message: 'Please enter email' }],
      type: (
        <Input
          value={values.email}
          name='email'
          placeholder='Please enter email '
        />
      ),
      error: errors.email,
    },
    {
      key: 'password',
      name: 'password',
      label: 'Password',
      rules: [{ required: true, message: 'Please enter user name' }],
      type: (
        <Input
          type='password'
          value={values.password}
          placeholder='Please enter password'
          name='password'
        />
      ),
      error: errors.password,
    },
    {
      key: 'phone',
      name: 'phone',
      label: 'Phone',
      rules: [{ required: true, message: 'Please enter Phone' }],
      type: (
        <Input
          value={values.phone}
          type='text'
          name='phone'
          placeholder='Please enter Phone '
        />
      ),
      error: errors.phone,
    },
    {
      key: 'address',
      label: 'Address',
      rules: [{ required: true, message: 'Please enter addres' }],
      type: (
        <Input
          type='text'
          name='addres'
          value={values.address}
          placeholder='Please enter address'
          name='address'
        />
      ),
      error: errors.address,
    },
    {
      type: (
        <Radio.Group
          value={values.status}
          name='status'
          defaultValue='active'
          buttonStyle='solid'
        >
          <Radio.Button
            checked={values.status === 'active'}
            style={{ marginRight: 10 }}
            value='active'
          >
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'hold'} value='hold'>
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: (
        <Radio.Group
          value={values.isAdmin}
          name='isAdmin'
          defaultValue={false}
          buttonStyle='solid'
        >
          <Radio.Button
            checked={values.isAdmin === true}
            style={{ marginRight: 10 }}
            value={true}
          >
            Admin
          </Radio.Button>
          <Radio.Button checked={values.isAdmin === false} value={false}>
            User
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'isAdmin',
      label: 'Usertype',
      error: errors.isAdmin,
    },
  ];

  const { Option } = Select;

  const columns = [
    {
      title: 'S.N',
      dataIndex: 'sn',
      key: 'sn',
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => <span>{record.fullName}</span>,
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      render: text => <span>{text === null ? '-' : text}</span>,
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Subscribed',
      dataIndex: 'subscribed',
      key: 'subscribed',
      render: text => <span>{text.toString()}</span>,
    },
    {
      title: 'Usertype',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: text => <span>{text === true ? 'Admin' : 'User'}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              setId(record.id);
              setData(record);
              //   setValues({ ...data });
              setvisible(true);
            }}
            className='mr-1 bg-primary'
            size='small'
            style={{ backgroundColor: 'white', border: 0 }}
          >
            <EditFilled style={{ color: 'green' }} />
          </Button>
          <Tooltip placement='bottomRight' title='Delete'>
            <Popconfirm
              title='Delete record?'
              onConfirm={() => handleDelete(record.id)}
            >
              <Button
                className='mr-1'
                style={{ backgroundColor: 'white', border: 0 }}
                size='small'
              >
                <DeleteFilled style={{ color: 'red' }} />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type='primary' onClick={showDrawer}>
        <PlusOutlined /> Add User
      </Button>
      <Space></Space>
      {/* table component */}

      <Table
        columns={columns}
        pagination={{ position: ' bottomCenter ' }}
        dataSource={props.users}
      />
      {/* <img src={imgOne} /> */}
      {/* {console.log("image one", imgOne)} */}
      <Drawer
        title='Add User'
        width={400}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose
        footer={
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button disabled={isSubmitting} onClick={onSubmit} type='primary'>
              Submit
            </Button>
          </div>
        }
      >
        {visible && (
          <Form
            onChange={onChange}
            onBlur={onBlur}
            onSubmit={onSubmit}
            labelAlign='right'
            layout='vertical'
          >
            <FormGenerator formItems={formItems} />
          </Form>
        )}
      </Drawer>
    </>
  );
};

const mapStoreToProps = ({ Users }) => {
  console.log('state', Users);
  return {
    users: Users.payload,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchUsers: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FETCH_USERS',
        param,
      }),
    ),
  createUser: values =>
    dispatch(
      actionCreator({ method: 'POST', action_type: 'CREATE_USER', values }),
    ),
  editUser: (id, values) =>
    dispatch(
      actionCreator({ method: 'PATCH', id, action_type: 'EDIT_USER', values }),
    ),
  deleteUser: id =>
    dispatch(
      actionCreator({
        method: 'DELETE',
        id,
        action_type: 'DELETE_USER',
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Users);
