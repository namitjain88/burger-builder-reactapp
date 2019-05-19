import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Button from "../UI/Button/Button";

class OrderSummary extends Component {
  //This could be a functional component; doesn't have to be a class based component.
  componentWillUpdate() { }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(
        ingKey => {
          return (
            <li key={ingKey}>
              <span style={{ textTransform: "capitalize" }}>{ingKey}</span>: {this.props.ingredients[ingKey]}
            </li>
          );
        }
      );
    return (
      <Auxiliary>
        <h3>Your order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.totalPrice}</strong>
        </p>
        <p>Continue to checkout?</p>

        <Button btnType="Danger" clicked={this.props.cancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continued}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
  }
}

export default OrderSummary;
