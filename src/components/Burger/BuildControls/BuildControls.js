import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const ingredientControls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.currentPrice.toFixed(2)} </strong>
    </p>
    {ingredientControls.map(ingControl => (
      <BuildControl
        key={ingControl.label}
        ingLabel={ingControl.label}
        addIngredient={() => props.addIngredient(ingControl.type)}
        removeIngredient={() => props.removeIngredient(ingControl.type)}
        disabled={props.disabledInfo[ingControl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.purchased}
    >
      Order Now
    </button>
  </div>
);

export default buildControls;
