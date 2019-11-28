import React from 'react';
import { Alert } from 'react-bootstrap';

class CartModalAlert extends React.Component {

    render() {

        return (
            <Alert show={this.props.show} onClose={this.props.onClose} variant="warning" dismissible>
                <span>
                    {this.props.mess}
                </span>
            </Alert>
        )
    }
}



export default CartModalAlert;