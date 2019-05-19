import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent';


const ayncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const ayncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const ayncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

class App extends Component {

  componentDidMount() {
    /* Auto login already logged in user if the page is refreshed.*/
    this.props.onCheckAuthState();
  }

  render() {
    /* Default routes for un-authenticated users. */
    let routes = (
      <Switch>
        <Route path='/auth' component={ayncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        {/* Redirect for unknown routes */}
        <Redirect to='/' />
      </Switch>
    );

    /* Routes available for authenticated users. */
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={ayncCheckout} />
          <Route path='/orders' component={ayncOrders} />
          {/* Below route fixes redirection to homepage post burger builder authentication */}
          <Route path='/auth' component={ayncAuth} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          {/* Redirect for unknown routes */}
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
