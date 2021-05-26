import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { Drawer, Button, Space, notification, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { STRINGS } from '_constants';
import { UserTable } from './table';
import { UserForm } from './form';

const Users = props => {
  const [visible, setvisible] = useState(false);
  const [submitting, setsubmitting] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [data, setData] = useState('');
  const [id, setId] = useState('');
  const [filterTable, setFilterTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const showDrawer = () => {
    setvisible(true);
  };
  const onClose = () => {
    setvisible(false);
    setId('');
    setData('');
  };
  const fetch = async () => {
    const data = await props.fetchUsers();
    setLoading(false);
  };
  const handleDelete = async id => {
    const a = await props.deleteUser(id);
    if (!a.error) {
      fetch();
    } else {
      message.error(a.message);
    }
  };

  const handleEdit = record => {
    setvisible(true);
    setId(record.id);
    setData(record);
  };

  useEffect(() => {
    if (!visible) fetch();
  }, [visible]);

  const search = value => {
    console.log('PASS', { value });

    const result = props.users.filter(o =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase()),
      ),
    );
    console.log(result);
    setFilterTable(result);
  };

  return (
    <>
      <Space>
        <Button
          style={{ marginBottom: 10 }}
          type='primary'
          onClick={showDrawer}
        >
          <PlusOutlined /> Add User
        </Button>
        <Input.Search
          style={{
            width: '400px',
            margin: '0 0 10px 0',
          }}
          placeholder='Search by...'
          enterButton
          onSearch={search}
        />
      </Space>
      <Space></Space>
      <UserTable
        userData={filterTable == null ? props.users : filterTable}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
      <Drawer
        title={id ? 'Edit User' : 'Add User'}
        width={400}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              disabled={submitting}
              onClick={() => setclicked(Math.random())}
              type='primary'
            >
              Submit
            </Button>
          </div>
        }
      >
        <UserForm
          setvisible={setvisible}
          setsubmitting={setsubmitting}
          setclicked={setclicked}
          clicked={clicked}
          data={data}
          id={id}
          setData={setData}
          setId={setId}
          {...props}
        />
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
