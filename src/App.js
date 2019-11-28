import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHeader from './components/NavbarHeader';
import Home from './components/Home';
import CheckOut from './components/CheckOut';
import OrderConfirm from './components/OrderConfirm';
import ProductDetail from './components/ProductDetail';
import { connect } from 'react-redux';
import { hideCartModal } from './actions/productAction';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import CartModal from './components/CartModal';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavbarHeader />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/orderconfirm" component={OrderConfirm} />
            <Route path="/detail/:id" component={ProductDetail} />
          </Switch>
          <CartModal onHide={() => this.props.hideCartModal()} show={this.props.showCartModal} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  showCartModal: state.product.showCartModal,
});

const mapDispatchToProps = {
  hideCartModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
