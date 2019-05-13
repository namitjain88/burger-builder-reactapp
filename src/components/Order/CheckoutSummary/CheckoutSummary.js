import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkOutSummary = (props) => {
    return (

        < div className={classes.CheckoutSummary} >
            {console.log('CheckoutSummary rendering with following props')}
            {console.log(props.ingredients)}
            <h2>We hope it tastes well!!</h2>
            <div style={{
                width: '100%',
                height: '300px',
                margin: 'auto'
            }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
        </div >
    );
}

export default checkOutSummary;