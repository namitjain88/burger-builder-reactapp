import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
    /* state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 0
    } */

    /* componentWillMount() {
         const query = new URLSearchParams(this.props.location.search);
         const ingredients = {};
         let price = 0;
         for (let param of query.entries()) {
             //each entry is like ['salad', '1']
             if (param[0] === 'price') {
                 price = param[1];
             } else {
                 ingredients[param[0]] = +param[1];
             }
         }
         //ingredients are not passed if /checkout/contact-data url is use directly.
         if (Object.entries(ingredients).length !== 0 && ingredients.constructor === Object)
             this.setState({ ingredients: ingredients, totalPrice: price });
    } */

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render() {
        console.log('Checkout.js render() starts');
        console.log(this.props.ingredients);
        let checkoutSummary = <Redirect to='/' />;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            checkoutSummary = (<div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.cancelCheckoutHandler}
                    checkoutContinued={this.continueCheckoutHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>);
        }
        return checkoutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);