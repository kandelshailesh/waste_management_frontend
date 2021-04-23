import React, { useRef, useState } from 'react';
import { LoginSchema } from '../../_utils/Schemas';
import { store } from '../../reducers/configureStore';
import { connect } from 'react-redux';
import { actionCreator } from '../../reducers/actionCreator';
import { Form, Input, Button, Checkbox,message } from 'antd';
import { Redirect } from 'react-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const FossilMdLoginPage = props => {
  const [loadings, setLoadings] = useState(false);

  const handleFormSubmission = async values => {
    //Handle submission goes here
    setLoadings(true);
   const response= await props.userLogin(JSON.stringify(values));
    if (response.type === 'FETCH_ERROR') {
       setLoadings(false);
       message.error(response.message);
    } else {
       setLoadings(false);
    }
  
  };

  if (props.isLogin) {
    return <Redirect to='/users'></Redirect>;
  } else {
    return (
      <Form
        name='normal_login'
        className='login-form'
        style={{
          border: '2px solid #eee',
          padding: '80px 50px 30px 50px',
          borderRadius: 5,
          marginTop:10,
          background:'white'
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleFormSubmission}
        scrollToFirstError
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Email is required',
            },
            {
              type: 'email',
              message: 'Enter valid email',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
                        loading={loadings}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

const mapStoreToProps = store => {
  return {
    isLogin: store.Login.isLogin,
  };
};

const mapDispatchToProps = dispatch => ({
  userLogin: values =>
    dispatch(
      actionCreator({
        method: 'POST',
        contentType: 'JSON',
        action_type: 'USER_LOGIN',
        values,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(FossilMdLoginPage);
