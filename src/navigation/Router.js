import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Index as NotFoundPage } from '../components/404';
import PrivateRoute from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { withRouter } from 'react-router';
import { store } from '../reducers/configureStore';

const loadable = loader => React.lazy(loader); // added

const routes = [
  // System Pages
  {
    path: '/login',
    component: loadable(() => import('../pages/Login')),
    exact: true,
    authorize: false,
  },
  {
    path: '/',
    component: loadable(() => import('../pages/users')),
    exact: true,
    authorize: true,
  },

  {
    path: '/users',
    component: loadable(() => import('../pages/users')),
    exact: true,
    authorize: true,
  },
  {
    path: '/events',
    component: loadable(() => import('../pages/events')),
    exact: true,
    authorize: true,
  },
  {
    path: '/packages',
    component: loadable(() => import('../pages/packages')),
    exact: true,
    authorize: true,
  },
  {
    path: '/complaints',
    component: loadable(() => import('../pages/complaints')),
    exact: true,
    authorize: false,
  },
  {
    path: '/blogs',
    component: loadable(() => import('../pages/blogs')),
    exact: true,
    authorize: true,
  },
  {
    path: '/employees',
    component: loadable(() => import('../pages/employee')),
    exact: true,
    authorize: true,
  },
  {
    path: '/schedules',
    component: loadable(() => import('../pages/schedule')),
    exact: true,
    authorize: true,
  },
  {
    path: '/collection_request',
    component: loadable(() => import('../pages/collection_request')),
    exact: true,
    authorize: true,
  },
  {
    path: '/subscriptions',
    component: loadable(() => import('../pages/subscriptions')),
    exact: true,
    authorize: true,
  },
    {
    path: '/logout',
    component: loadable(() => import('../pages/Logout')),
    exact: true,
    authorize: true,
  },
];

const Router = props => {
  return (
    <Switch>
      {routes.map(route => {
        if (route.authorize) {
          return (
            <PrivateRoute
              authorized={store.getState().Login.isLogin}
              key={route.path}
              keys={route.path}
              exact={route.exact}
              {...route}
              {...props}
            />
          );
        } else {
          return (
            <PublicRoute
              {...props}
              path={route.path}
              component={route.component}
              key={route.path}
              exact={route.exact}
              header={route.header}
              footer={route.footer}
              header={route.header || true}
            />
          );
        }
      })}

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(Router);
