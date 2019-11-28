import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchProducts, addToCart } from '../actions/productAction';
import ProductItem from './ProductItem';

class Home extends React.Component {

    componentDidMount() {
        this.props.fetchProducts();
    }

    handleAddToCardClick = (id) => {
        this.props.addToCart(id);
    }

    handleImageClick(id) {
        let path = `/detail/${id}`;
        this.props.history.push(path);
    }

    render() {

        let products = this.props.products.map((item) => {
            return (
                <ProductItem onImageClick={() => this.handleImageClick(item.id)} key={item.id} onAddToCartClick={() => this.handleAddToCardClick(item.id)} product={item} />
            )
        })
        return (
            <Container>
                <h3 className="text-center  mt-3 mb-3">Black Friday Sale</h3>
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
    addToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)