import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import cartIcon from '../assets/shopping-bag.svg';
import { showCartModal } from './../actions/productAction';
import {
    Link
} from "react-router-dom";
class NavbarHeader extends React.Component {
    render() {
        return (

            <Navbar bg="light" expand="lg">
                <Container>
                    <Link className="navbar-brand" to="/">Logo</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/">Sales</Link>
                            <Link className="nav-link" to="/">Shoes</Link>
                            <Link className="nav-link" to="/">Clothes</Link>
                            <Link className="nav-link" to="/">Accessories</Link>
                        </Nav>
                        <Nav>
                            <Nav.Link >
                                <div onClick={this.props.showCartModal} className="cart-icon">
                                    <span className="cart-badge">{this.props.totalItem}</span>
                                    <img className="cart-img" src={cartIcon} alt="" />
                                </div>
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        )
    }
}

const mapStateToProps = state => ({
    items: state.product.addedItems,
    totalItem: state.product.totalItem,
});

const mapDispatchToProps = {
    showCartModal,
};


export default connect(mapStateToProps, mapDispatchToProps)(NavbarHeader)