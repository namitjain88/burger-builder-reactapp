import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios.orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  /*  addIngredientHandler = type => {
     const oldCount = this.state.ingredients[type];
     const updatedCount = oldCount + 1;
     const updatedIngredients = {
       ...this.state.ingredients
     };
     updatedIngredients[type] = updatedCount;
     const priceAddition = INGREDIENT_PRICES[type];
     const oldPrice = this.state.totalPrice;
     const newPrice = oldPrice + priceAddition;
     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
     this.updatePurchasableStateHandler(updatedIngredients);
   }; */

  /* removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasableStateHandler(updatedIngredients);
  }; */

  updatePurchasableStateHandler = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      });
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let ingType in disabledInfo) {
      disabledInfo[ingType] = disabledInfo[ingType] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingredient can't be loaded!!</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabledInfo={disabledInfo}
            currentPrice={this.props.price}
            purchasable={this.updatePurchasableStateHandler(
              this.props.ingredients
            )}
            purchased={this.purchaseHandler}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancelled={this.cancelPurchaseHandler}
          continued={this.continuePurchaseHandler}
          totalPrice={this.props.price}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          cancelled={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingredientName =>
      dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    onRemoveIngredient: ingredientName =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
