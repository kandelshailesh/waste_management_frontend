import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { Drawer, Button, Space, notification, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { STRINGS } from '_constants';
import { EventTable } from './table';
import { EventForm } from './form';

const Event = props => {
  const title = 'Event';
  const [visible, setvisible] = useState(false);
  const [submitting, setsubmitting] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [data, setData] = useState('');
  const [id, setId] = useState('');
  const showDrawer = () => {
    setvisible(true);
  };
  const onClose = () => {
    setvisible(false);
    setId('');
    setData('');
  };
  const fetch = async () => {
    await props.fetchEvents();
  };
  const handleDelete = async id => {
    const a = await props.deleteEvent(id);
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
      <EventTable
        userData={props.event}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
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
        <EventForm
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

const mapStoreToProps = ({ Events }) => {
  console.log('state', Events);
  return {
    event: Events.payload,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchEvents: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FETCH_EVENT',
        param,
      }),
    ),
  createEvent: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        contentType: 'JSON',
        action_type: 'CREATE_EVENT',
        values,
      }),
    ),
  editEvent: (id, values) =>
    dispatch(
      actionCreator({
        method: 'PATCH',
        id,
        action_type: 'EDIT_EVENT',
        contentType: 'JSON',

        values,
      }),
    ),
  deleteEvent: id =>
    dispatch(
      actionCreator({
        method: 'DELETE',
        id,
        action_type: 'DELETE_EVENT',
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Event);
