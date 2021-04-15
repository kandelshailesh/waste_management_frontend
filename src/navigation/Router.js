import React from "react";
import { Route, Switch } from "react-router-dom";
import { Index as NotFoundPage } from "../components/404";
import PrivateRoute from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { withRouter } from "react-router";
import { store } from "../reducers/configureStore";

const loadable = (loader) => React.lazy(loader); // added

const routes = [
  // System Pages
  {
    path: "/login",
    component: loadable(() => import("../pages/Login/Login")),
    exact: true,
    authorize: false,
  },
  {
    path: "/dkdk",
    component: loadable(() => import("../pages/users")),
    exact: true,
    authorize: false,
  },

  {
    path: "/users",
    component: loadable(() => import("../pages/users")),
    exact: true,
    authorize: false,
  },
  {
    path: "/events",
    component: loadable(() => import("../pages/events")),
    exact: true,
    authorize: false,
  },
  {
    path: "/packages",
    component: loadable(() => import("../pages/packages")),
    exact: true,
    authorize: false,
  },
  {
    path: "/complaints",
    component: loadable(() => import("../pages/complaints")),
    exact: true,
    authorize: false,
  },
  {
    path: "/blogs",
    component: loadable(() => import("../pages/blogs")),
    exact: true,
    authorize: false,
  },
  {
    path: "/employees",
    component: loadable(() => import("../pages/employee")),
    exact: true,
    authorize: false,
  },
  {
    path: "/schedules",
    component: loadable(() => import("../pages/schedule")),
    exact: true,
    authorize: false,
  },
  {
    path: "/collection_request",
    component: loadable(() => import("../pages/collection_request")),
    exact: true,
    authorize: false,
  },
  {
    path: "/subscriptions",
    component: loadable(() => import("../pages/subscriptions")),
    exact: true,
    authorize: false,
  },
];

const Router = (props) => {
  return (
    <Switch>
      {routes.map((route) => {
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
