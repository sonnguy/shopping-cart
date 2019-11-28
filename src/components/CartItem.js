import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
class CartItem extends React.Component {
    render() {
        const { product, onRemoveClick, onSubtractClick, onAddClick, showCartWarning } = this.props;
        return (
            <div>
                <Row className="cart-item d-flex justify-content-space align-items-center">
                    <Col xs={1}>
                        <button onClick={onRemoveClick} type="button" className="close"><span aria-hidden="true">×</span></button>
                    </Col>
                    <Col>
                        <img className="cart-item-image" src={product.img} alt="" />
                    </Col>
                    <Col xs={9} className="d-flex justify-content-between align-items-center">
                        <div className="cart-info-item"><b>{product.title}</b></div>
                        <div className="cart-info-item d-flex justify-content-end align-items-center">
                            <Button variant="secondary" onClick={onAddClick} className="cart-item-btn">+</Button>
                            <span className="cart-item-quantity"><b>{product.quantity}</b></span>
                            <Button variant="secondary" onClick={onSubtractClick} className="cart-item-btn">-</Button>
                        </div>
                        <div className="cart-info-item d-flex justify-content-end"><b>{product.price}$</b></div>
                    </Col>
                </Row>
                {
                    (showCartWarning && product.quantity === product.inventory) ?
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <p className="cart-warning-message">This item is currently out of stock!</p>
                            </Col>
                        </Row> : null
                }

            </div>

        )
    }
}

export default CartItem;