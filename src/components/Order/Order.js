import React from 'react';
import classes from './Order.css';
import Button from '../UI/Button/Button';

const order = (props) => {

    const ingredients = [];
    for (let ing in props.ingredients) {
        ingredients.push({
            name: ing,
            amount: props.ingredients[ing]
        });
    }

    const ingredientsOutput = ingredients.map(ing => {
        return (<span key={ing.name} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}>{ing.name} ({ing.amount})</span>)
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price}</strong> &nbsp; &nbsp;
            <Button btnType='Danger' clicked={props.deleted}>DELETE</Button></p>
        </div>
    );
}

export default order;