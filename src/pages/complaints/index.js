import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { Drawer, Button, Space, notification, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { STRINGS } from '_constants';
import { ComplaintTable } from './table';
import { ComplaintForm } from './form';

const Complaint = props => {
  const title = 'Complaint';
  const [visible, setvisible] = useState(false);
  const [submitting, setsubmitting] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [data, setData] = useState('');
  const [id, setId] = useState('');
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
    await props.fetchComplaints();
    await props.fetchUsers({ isAdmin: '0' });
    setLoading(false);
  };
  const handleDelete = async id => {
    const a = await props.deleteComplaint(id);
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

  return (
    <>
      <Button style={{ marginBottom: 10 }} type='primary' onClick={showDrawer}>
        <PlusOutlined /> Add {title}
      </Button>
      <Space></Space>
      <ComplaintTable
        userData={props.complaints}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
      <Drawer
        title={id ? `Edit ${title}` : `Add ${title}`}
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
        <ComplaintForm
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

const mapStoreToProps = ({ Complaints, Users }) => {
  console.log('state', Complaints);
  return {
    complaints: Complaints.payload,
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
  fetchComplaints: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FETCH_COMPLAINT',
        param,
      }),
    ),
  createComplaint: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        action_type: 'CREATE_COMPLAINT',
        values,
      }),
    ),
  editComplaint: (id, values) =>
    dispatch(
      actionCreator({
        method: 'PATCH',
        id,
        action_type: 'EDIT_COMPLAINT',
        values,
      }),
    ),
  deleteComplaint: id =>
    dispatch(
      actionCreator({
        method: 'DELETE',
        id,
        action_type: 'DELETE_COMPLAINT',
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Complaint);
