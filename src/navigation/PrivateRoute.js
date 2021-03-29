import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Footer from 'pages/footer';
import Header from 'pages/header';
import { message, notification } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from '../reducers/actionCreator';

const PrivateRoute = props => {
  const {
    authorized,
    component: Component,
    path,
    keys,
    exact,
    history,
  } = props;
  const [scroll, setscroll] = useState(0);
  const [access, set_access] = useState(false);
  const [message, set_message] = useState('');

  const check = async () => {
    try {
      const { hospitalId } = JSON.parse(localStorage.getItem('user_data'));
      if (hospitalId) {
        const a = await props.checkStatus(hospitalId);
        if (a.error) {
          set_access(true);
        } else {
          set_access(false);
          set_message(a.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    check();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 80,
      left: 100,
      behavior: 'smooth',
    });
  }, [scroll]);
  //   alert(path);

  if (set_access) {
    return (
      <Route
        path={path}
        key={keys}
        exact={exact}
        render={props => {
          //
          if (authorized) {
            return (
              <div
                className='main_container'
                style={{
                  width: '100%',
                  overflowX: 'hidden',
                }}
              >
                <Header {...props} />
                <div>
                  <Component {...props} />
                </div>
                <Footer setscroll={setscroll} />
              </div>
            );
          } else {
            // notification.error({
            //   message: 'Unauthorized Access',
            //   description: 'Please Login to Access the Page !',
            // });
            history.push('/login');
            // window.location.href = '/';
          }
          // } else {
          //   //
          //   notification.error({
          //     message: 'Unauthorized Access',
          //     description: 'You have no rights to access this page!',
          //   });
          //   return <Redirect to='/' />;
          // }
          // return <Redirect to="/user/login" />
          // return <Redirect to='/' />;
        }}
      />
    );
  }
};

const mapStoreToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => ({
  checkStatus: id =>
    dispatch(
      actionCreator({
        method: 'GET',
        action_type: 'CHECK_HOSPITAL_STATUS',
        id,
      }),
    ),
});

export default connect(mapStoreToProps, mapDispatchToProps)(PrivateRoute);
