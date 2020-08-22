import * as React from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";

function Alert({ errorState }) {
  const alert = useAlert();
  const mounted = React.useRef();

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (errorState.message) {
        alert.error(errorState.message);
      }
    }
  }, [errorState]);
  return <React.Fragment />;
}

const mapStateToProps = (state) => ({
  errorState: state.errorsReducer,
});

export default connect(mapStateToProps, null)(Alert);
