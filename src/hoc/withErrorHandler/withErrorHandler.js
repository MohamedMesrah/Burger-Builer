import React, { Component, Fragment } from "react";
import Modal from "../../components/UI/modal/modal";
import BackDrop from "../../components/UI/backDrop/backDrop";

const withErrorHandler = (WrrapedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      axios.interceptors.request.use(null, err => {
        this.setState({ error: err.message });
      });

      axios.interceptors.response.use(null, err => {
        this.setState({ error: err.message });
      });
    }

    state = {
      error: null
    };

    handlBeackDropCancel = () => {
      this.setState({ error: null });
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      const { error } = this.state;
      return (
        <Fragment>
          <BackDrop show={error} onBackDropCancel={this.handlBeackDropCancel} />
          <Modal show={error}>{error}</Modal>
          <WrrapedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
