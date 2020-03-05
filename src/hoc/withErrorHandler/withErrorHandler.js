import React, { Component, Fragment } from "react";
import Modal from "../../components/UI/modal/modal";
import BackDrop from "../../components/UI/backDrop/backDrop";

const withErrorHandler = (WrrapedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    handlBeackDropCancel = () => {
      this.setState({ error: null });
    };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        // this.setState({ error: null });
        return req;
      });

      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      const { error } = this.state;
      return (
        <Fragment>
          <BackDrop show={error} onBackDropCancel={this.handlBeackDropCancel} />
          <Modal show={error}>{error ? error.message : null}</Modal>
          <WrrapedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
