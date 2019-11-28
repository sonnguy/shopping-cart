import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productAction';
import images from '../api/data/images';
import ProductItem from './ProductItem';

class Cart extends React.Component {

    componentDidMount() {
        this.props.fetchProducts();
    }
    render() {

        let products = this.props.products.map((item, index) => {
            return (
                <ProductItem key={item.id} img={images[index]} onAddToCartClick={() => this.handleAddToCardClick(item.id)} product={item} />
            )
        })
        return (
            <Container>
                <h3 className="text-center">Our items</h3>
                <Row>
                    {products}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    loading: state.product.loading,
    error: state.product.error
});

const mapDispatchToProps = {
    fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)