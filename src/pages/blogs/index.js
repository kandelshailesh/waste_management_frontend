import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { Drawer, Button, Space, notification, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { STRINGS } from '_constants';
import { BlogTable } from './table';
import { BlogForm } from './form';

const Blogs = props => {
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
    await props.fetchBlogs();
  };
  const handleDelete = async id => {
    const a = await props.deleteBlog(id);
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
        <PlusOutlined /> Add Blog
      </Button>
      <Space></Space>
      <BlogTable
        userData={props.blogs}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Drawer
        title={id ? 'Edit Blog' : 'Add Blog'}
        width={700}
        onClose={onClose}
        destroyOnClose
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
        <BlogForm
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

const mapStoreToProps = ({ Blogs }) => {
  console.log('state', Blogs);
  return {
    blogs: Blogs.payload,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchBlogs: param =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'FETCH_BLOG',
        param,
      }),
    ),
  createBlog: values =>
    dispatch(
      actionCreator({ method: 'POST', action_type: 'CREATE_BLOG', values }),
    ),
  editBlog: (id, values) =>
    dispatch(
      actionCreator({ method: 'PATCH', id, action_type: 'EDIT_BLOG', values }),
    ),
  deleteBlog: id =>
    dispatch(
      actionCreator({
        method: 'DELETE',
        id,
        action_type: 'DELETE_BLOG',
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Blogs);
