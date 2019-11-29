import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHeader from './components/navbar/NavbarHeader';
import Product from './components/product';
import CheckOut from './components/checkOut';
import OrderConfirm from './components/order/OrderConfirm';
import ProductDetail from './components/product/ProductDetail';
import CartModal from './components/cart/CartModal';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavbarHeader />

          <Switch>
            <Route exact path="/" component={Product} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/orderconfirm" component={OrderConfirm} />
            <Route path="/detail/:id" component={ProductDetail} />
          </Switch>
          <CartModal show={this.props.showCartModal} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  showCartModal: state.product.showCartModal,
});


export default connect(mapStateToProps)(App);
