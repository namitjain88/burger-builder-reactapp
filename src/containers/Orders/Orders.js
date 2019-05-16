import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios.orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    deleteOrderHandler = (orderId) => {
        console.log("Deleting order id: " + orderId);
        this.props.onDeleteOrder(orderId);
    }

    render() {
        return (
            this.props.loading ? <Spinner /> :
                <div>
                    {this.props.orders.map(order => {
                        return <Order key={order.id}
                            ingredients={order.ingredients}
                            price={order.totalPrice}
                            deleted={() => this.deleteOrderHandler(order.id)} />;
                    })}
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
        onDeleteOrder: (orderId) => dispatch(actions.deleteOrder(orderId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));