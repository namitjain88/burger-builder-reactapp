import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios.orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const orders = [];
                for (let key in response.data) {
                    orders.push({
                        id: key,
                        ...response.data[key]
                    });
                }
                this.setState({ orders: orders, loading: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.totalPrice} />;
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);