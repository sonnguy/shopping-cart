import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import ProductStatus from './ProductStatus';
import ProductDiscountTag from './ProductDiscountTag';
class ProductItem extends React.Component {
    render() {
        const { product, onAddToCartClick, onImageClick } = this.props;
        return (
            <Col md={4} sm={6}>
                <Card>
                    <ProductDiscountTag discount={product.discount} />
                    <Card.Img className="product-item-img" onClick={onImageClick} variant="top" src={product.img} />
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            {product.desc}
                        </Card.Text>
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
                    </Card.Body>
                    <Button disabled={product.inventory === 0} onClick={onAddToCartClick} variant="dark" style={{ borderRadius: 0 }}>ADD TO CART</Button>
                </Card>
            </Col>
        )
    }
}

export default ProductItem;