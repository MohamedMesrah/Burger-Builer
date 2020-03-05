import React, { Component } from "react";
import Aux from "../../hoc/aux";
import Burger from "../../components/burger/burger";
import BuildControls from "../../components/buildControls/buildControls";
import Modal from "../../components/UI/modal/modal";
import OrderSummary from "../../components/order/orderSummary/orderSummary";
import BackDrop from "../../components/UI/backDrop/backDrop";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./burgerBuilder.module.css";
import { connect } from "react-redux";
import * as builderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchase = () => {
    const { ings } = this.props;
    const purchasable = !ings
      ? false
      : Object.keys(ings)
          .map(igKey => {
            return ings[igKey];
          })
          .reduce((a, c) => a + c > 0);
    return purchasable;
  };

  purchasingHandler = () => {
    this.props.isAuth
      ? this.setState({ purchasing: true })
      : this.props.history.push("/auth");
  };

  backDropCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  cancelHandller = () => {
    this.setState({ purchasing: false });
  };

  continueHandller = () => {
    this.props.history.push("/checkout");
  };

  render() {
    this.updatePurchase();
    const { purchasing, loading } = this.state;
    const { ings, price, isAuth } = this.props;
    const disabledInfo = { ...ings };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <BackDrop
          show={purchasing}
          onBackDropCancel={this.backDropCancelHandler}
        />
        <Modal show={purchasing}>
          {loading ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={ings}
              totalPrice={price}
              purchasing={purchasing}
              onCancel={this.cancelHandller}
              onContinue={this.continueHandller}
            />
          )}
        </Modal>
        {!ings ? (
          this.props.error ? (
            <h1>Ingredients can't be loaded</h1>
          ) : (
            <div className={classes.loading}>
              <Spinner />
            </div>
          )
        ) : (
          <Aux>
            <Burger ingredients={ings} />
            <BuildControls
              addIngredient={this.props.onAddIngredient}
              removeIngredient={this.props.onRemoveIngredient}
              disabledInfo={disabledInfo}
              totalPrice={price}
              purchasable={this.updatePurchase()}
              ordered={this.purchasingHandler}
              isAuth={isAuth}
            />
          </Aux>
        )}
      </Aux>
    );
  }
}
const mapStateToProps = state => ({
  ings: state.builder.ingredients,
  price: state.builder.totalPrice,
  error: state.builder.error,
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onAddIngredient: name => dispatch(builderActions.addIngredient(name)),
  onRemoveIngredient: name => dispatch(builderActions.removeIngredient(name)),
  onInitIngredients: () => dispatch(builderActions.initIngredients())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
