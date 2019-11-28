import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeItem, subtractQuantity, addQuantity, checkStockAvailable } from '../actions/productAction';
import CartItem from './CartItem';
import CartModalAlert from './CartModalAlert';
import { withRouter } from "react-router-dom";

class CartModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showAlert: false, mess: '' };
    }

    handleCheckoutClick() {
        let path = `/checkout`;
        this.props.history.push(path);
        this.props.onHide();
    }

    handleContinueShoppingClick() {
        let path = `/`;
        this.props.history.push(path);
        this.props.onHide();
    }


    handleRemoveClick = (id) => {
        this.props.removeItem(id);
    }

    handleAlertClose = () => {
        this.setState({ showAlert: false, mess: '' });
    }

    handleSubtractQuantityClick = (id) => {
        this.props.subtractQuantity(id);
    }

    handleAddQuantityClick = (id) => {
        if (checkStockAvailable(id)) {
            this.props.addQuantity(id);
        } else {
            this.setState({ showAlert: true, mess: 'Not enough item available in stock!' });
        }
    }

    render() {
        const products = this.props.products.map((item) => {
            return (
                <div>
                    <CartItem
                        key={item.id}
                        product={item}
                        showCartWarning={this.props.showCartWarning}
                        onRemoveClick={() => this.handleRemoveClick(item.id)}
                        onAddClick={() => this.handleAddQuantityClick(item.id)}
                        onSubtractClick={() => this.handleSubtractQuantityClick(item.id)}
                    />
                    <hr className="mb-4" />
                </div>

            )
        })
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="border-bottom-0">
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your Shopping Cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CartModalAlert show={this.state.showAlert} mess={this.state.mess} onClose={() => this.handleAlertClose()} />
                    <div className="cart-modal-body">
                        {
                            this.props.products.length > 0 ?
                                <div>
                                    {products}

                                    <div className="cart-total d-flex justify-content-end container">
                                        <span className="total-number"><b>TOTAL:</b> <span className="product-item__sale-price">{this.props.total}$</span></span>
                                    </div>
                                </div>
                                :
                                <div className="cart-modal-body-empty d-flex justify-content-center">
                                    Your shopping cart is empty!
                                </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-top-0 d-flex justify-content-center">
                    <Button style={{ width: '100%' }} variant="dark" className="cart-modal-checkout-btn" onClick={() => this.props.products.length === 0 ? this.handleContinueShoppingClick() : this.handleCheckoutClick()}>{this.props.products.length === 0 ? 'Continue Shopping' : 'Check out'}</Button>
                </Modal.Footer>
            </Modal >
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.addedItems,
    total: state.product.total,
    showCartWarning: state.product.showCartWarning
});

const mapDispatchToProps = {
    removeItem,
    subtractQuantity,
    addQuantity,
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartModal))