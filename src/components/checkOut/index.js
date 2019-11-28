import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/productAction';
import CheckOutForm from './CheckoutForm';

class CheckOut extends React.Component {
    render() {
        let items = this.props.addedItems.map((item) => {
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
                    <Col className="mb-4" md={{ span: 4, order: 2 }}>
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">{this.props.totalItem}</span>
                        </h4>
                        <ListGroup>
                            {items}
                            <ListGroup.Item className="d-flex justify-content-between">
                                <div>
                                    <b> TOTAL </b>
                                </div>
                                <div>
                                    <b><span className="product-item__sale-price">{this.props.total}$</span></b>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={{ span: 8, order: 1 }}>
                        <h4 className="mb-3">Billing address</h4>
                        <CheckOutForm />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    addedItems: state.product.addedItems,
    total: state.product.total,
    totalItem: state.product.totalItem,
});

const mapDispatchToProps = {
    fetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)