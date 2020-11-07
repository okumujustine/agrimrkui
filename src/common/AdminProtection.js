import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AdminProtection = ({ component: Component, authState, ...rest }) => {
  const { user } = authState;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && user.roles && user.roles[0] === "agronomist") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, null)(AdminProtection);
