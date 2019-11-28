import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchProductById, addToCart } from '../actions/productAction';
import ProductDiscountTag from './ProductDiscountTag';
import ProductStatus from './ProductStatus';
class ProductDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchProductById(parseInt(id, 10));
    }
    handleAddToCardClick = (id) => {
        this.props.addToCart(id);
    }
    render() {
        const { product } = this.props;
        return (
            <Container className="product-detail my-5">
                <Row>
                    <Col>
                        <div className="product-detail__image-block">
                            <ProductDiscountTag discount={product.discount} />
                            <img className="product-detail__image-block__image" src={product.img} alt="" />
                        </div>
                    </Col>
                    <Col>
                        <div className="product-detail__info-block">
                            <div className="product-detail__info-block__name mb-3">
                                <h3 >{product.title}</h3>
                            </div>
                            <div className="product-detail__info-block__desc mb-3" >{product.desc}</div>
                            <div className="product-detail__info-block__price mb-3 ">
                                <p><b>Remaining items: {product.inventory}</b></p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        {
                                            product.oldPrice !== product.price ?
                                                <span className="product-item__old-price">{product.oldPrice}$</span>
                                                : null
                                        }
                                        <span className="product-item__sale-price">{product.price}$</span>
                                    </div>
                                    <ProductStatus inventory={product.inventory} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button disabled={product.inventory === 0} onClick={() => this.handleAddToCardClick(product.id)} variant="dark" style={{ borderRadius: 0, width: '100%' }}>ADD TO CART</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    product: state.product.product,
});

const mapDispatchToProps = {
    fetchProductById,
    addToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)