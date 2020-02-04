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

const INGREDIENT_PRICES = {
  salad: 2,
  cheese: 3,
  meat: 5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => this.setState({ error: true }));
  }

  addIngredientHandler = type => {
    let { ingredients, totalPrice, purchasable } = this.state;
    ingredients[type] = ingredients[type] + 1;
    totalPrice = totalPrice + INGREDIENT_PRICES[type];
    purchasable = this.updatePurchase();
    this.setState({ ingredients, totalPrice, purchasable });
  };

  removeIngredientHandler = type => {
    let { ingredients, totalPrice, purchasable } = this.state;
    ingredients[type] = ingredients[type] - 1;
    totalPrice = totalPrice - INGREDIENT_PRICES[type];
    purchasable = this.updatePurchase();
    this.setState({ ingredients, totalPrice, purchasable });
  };

  updatePurchase = () => {
    const { ingredients } = this.state;
    const purchasable = !ingredients
      ? false
      : Object.keys(ingredients)
          .map(igKey => {
            return ingredients[igKey];
          })
          .reduce((a, c) => a + c > 0);
    return purchasable;
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  backDropCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  cancelHandller = () => {
    this.setState({ purchasing: false });
  };

  continueHandller = () => {
    const { ingredients, totalPrice } = this.state;
    let queryParams = [];
    for (const i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push("totalPrice=" + totalPrice);
    let queryString = "?" + queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: queryString
    });
  };

  render() {
    this.updatePurchase();
    const {
      ingredients,
      totalPrice,
      purchasable,
      purchasing,
      loading,
      error
    } = this.state;
    const disabledInfo = { ...ingredients };
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
              ingredients={ingredients}
              totalPrice={totalPrice}
              purchasing={purchasing}
              onCancel={this.cancelHandller}
              onContinue={this.continueHandller}
            />
          )}
        </Modal>
        {!ingredients ? (
          error ? (
            <h1>Ingredients can't be</h1>
          ) : (
            <div className={classes.loading}>
              <Spinner />
            </div>
          )
        ) : (
          <Aux>
            <Burger ingredients={ingredients} />
            <BuildControls
              addIngredient={this.addIngredientHandler}
              removeIngredient={this.removeIngredientHandler}
              disabledInfo={disabledInfo}
              totalPrice={totalPrice}
              purchasable={purchasable}
              ordered={this.purchasingHandler}
            />
          </Aux>
        )}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
