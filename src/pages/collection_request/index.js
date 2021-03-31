import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { Drawer, Button, Space, notification, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { STRINGS } from '_constants';
import { CollectionRequestTable } from './table';
import { CollectionRequestForm } from './form';

const CollectionRequest = props => {
  const title = 'Collection Request';
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
    await props.fetchCollectionRequests();
    await props.fetchUsers({ isAdmin: '0' });
  };
  const handleDelete = async id => {
    const a = await props.deleteCollectionRequest(id);
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
      <CollectionRequestTable
        userData={props.collection_request}
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
        <CollectionRequestForm
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

const mapStoreToProps = ({ CollectionRequests, Users }) => {
  console.log('state', CollectionRequests);
  return {
    collection_request: CollectionRequests.payload,
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
  fetchCollectionRequests: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FETCH_COLLECTION_REQUEST',
        param,
      }),
    ),
  createCollectionRequest: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        contentType: 'JSON',
        action_type: 'CREATE_COLLECTION_REQUEST',
        values,
      }),
    ),
  editCollectionRequest: (id, values) =>
    dispatch(
      actionCreator({
        method: 'PATCH',
        id,
        action_type: 'EDIT_COLLECTION_REQUEST',
        contentType: 'JSON',

        values,
      }),
    ),
  deleteCollectionRequest: id =>
    dispatch(
      actionCreator({
        method: 'DELETE',
        id,
        action_type: 'DELETE_COLLECTION_REQUEST',
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(CollectionRequest);
