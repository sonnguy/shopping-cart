import React from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';


class OrderConfirm extends React.Component {
    handleContinueShoppingClick() {
        let path = `/`;
        this.props.history.push(path);
    }

    render() {
        const products = JSON.parse(localStorage.getItem('orderConfirmItem')) || [];
        const userPaymentInfo = JSON.parse(localStorage.getItem('userPaymentInfo')) || [];
        const total = localStorage.getItem('orderTotalPrice') || 0;
        const items = products.map((item) => {
            return (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                    <div>
                        {item.title} ({item.quantity})
                    </div>
                    <div>
                        <b>{item.price}$</b>
                    </div>
                </ListGroup.Item>
            )
        })
        return (
            <Container>
                <Row className="my-5">
                    <Col className="mb-4" md={{ span: 6, offset: 3 }}>

                        <h2 className="text-center">Thank You For Your Order!</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium iste ipsa numquam odio dolores, nam.</p>

                        <ListGroup>
                            <ListGroup.Item variant="info" className="d-flex justify-content-between">
                                <div>
                                    <b> Order Confirmation # </b>
                                </div>
                                <div>
                                    <b>2345678</b>
                                </div>
                            </ListGroup.Item>

                            {items}
                            <ListGroup.Item className="d-flex justify-content-between">
                                <div>
                                    <b> TOTAL </b>
                                </div>
                                <div>
                                    <b><span className="product-item__sale-price">{total}$</span></b>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                        <div className="d-flex justify-content-between my-2">
                            <div className="delivery-address">
                                <b>Delivery Address</b>
                                <p>{userPaymentInfo.address}</p>
                                <p>{userPaymentInfo.district}, {userPaymentInfo.province}</p>
                            </div>
                            <div className="estimated-delivery-date">
                                <b>Estimated Delivery Date</b>
                                <p>December 1st, 2019</p>
                            </div>
                        </div>
                        <Button onClick={() => this.handleContinueShoppingClick()} size="lg" variant="dark" style={{ width: '100%' }}>Continue Shopping</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default OrderConfirm