import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { purchaseOrder } from '../actions/productAction';
import { connect } from 'react-redux';

class CheckOutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            fields: JSON.parse(localStorage.getItem('userPaymentInfo')) || {
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                province: '',
                district: '',
                phoneNumber: '',
                isSaveShippingAddress: false,
                isSaveUserInfo: false,
                paymentMethod: '',
                nameOncard: '',
                cardNumber: '',
                cardExpiration: '',
                cvvNumber: '',
            },
        };
    }


    handleInputChange = event => {
        const fields = this.state.fields;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        fields[name] = value;

        this.setState({ fields });
    }

    handleSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true });
        this.props.purchaseOrder();
        localStorage.setItem('userPaymentInfo', JSON.stringify(this.state.fields));
        let path = `/orderconfirm`;
        this.props.history.push(path);
    };
    render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            name="firstName"
                            value={this.state.fields.firstName}
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            placeholder="First name"
                        />
                        <Form.Control.Feedback type="invalid">
                            Valid first name is required.
                                     </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            name="lastName"
                            value={this.state.fields.lastName}
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback type="invalid">
                            Valid last name is required.
                                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            value={this.state.fields.email}
                            onChange={this.handleInputChange}
                            required
                            type="email"
                            placeholder="Email"
                        />
                        <Form.Control.Feedback type="invalid">
                            Valid email is required.
                                     </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            name="address"
                            value={this.state.fields.address}
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            placeholder="1243 Hồ Xuân Hương"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter your shipping address.
                                         </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                        <Form.Label>Province</Form.Label>
                        <select
                            className="custom-select d-block w-100"
                            id="province"
                            name="province"
                            value={this.state.fields.province}
                            onChange={this.handleInputChange} required>
                            <option value="">Choose...</option>
                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        </select>
                        <Form.Control.Feedback type="invalid">
                            Please select a valid province.
                                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom06">
                        <Form.Label>District</Form.Label>
                        <select
                            className="custom-select d-block w-100"
                            id="district"
                            name="district"
                            value={this.state.fields.district}
                            onChange={this.handleInputChange} required>
                            <option value="">Choose...</option>
                            <option value="Quận 1">Quận 1</option>
                            <option value="Quận 2">Quận 2</option>
                            <option value="Quận 3">Quận 3</option>
                        </select>
                        <Form.Control.Feedback type="invalid">
                            Please select a valid district.
                                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom07">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            name="phoneNumber"
                            value={this.state.fields.phoneNumber}
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            placeholder="0979568265"
                        />
                        <Form.Control.Feedback type="invalid">
                            Valid phone number is required.
                                         </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <hr className="mb-4" />
                <div className="mb-3">
                    <Form.Check
                        custom
                        name="isSaveShippingAddress"
                        checked={this.state.fields.isSaveShippingAddress}
                        onChange={this.handleInputChange}
                        type="checkbox"
                        id={1}
                        label={`Shipping address is the same as my billing address`}
                    />
                    <Form.Check
                        name="isSaveUserInfo"
                        checked={this.state.fields.isSaveUserInfo}
                        onChange={this.handleInputChange}
                        custom
                        type="checkbox"
                        id={2}
                        label={`Save this information for next time`}
                    />
                </div>
                <hr className="mb-4" />
                <h4 className="mb-3">Payment</h4>
                <div className="d-block my-3">
                    <Form.Check
                        checked={this.state.fields.paymentMethod === 'credit'}
                        name="paymentMethod"
                        value={'credit'}
                        onChange={this.handleInputChange}
                        custom
                        type="radio"
                        id={'credit'}
                        label={`Credit card`}
                    />
                    <Form.Check
                        checked={this.state.fields.paymentMethod === 'debit'}
                        name="paymentMethod"
                        value={'debit'}
                        onChange={this.handleInputChange}
                        custom
                        type="radio"
                        id={'debit'}
                        label={`Debit card`}
                    />
                </div>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom08">
                        <Form.Label>Name on card <small className="text-muted">Full name as displayed on card</small></Form.Label>
                        <Form.Control
                            name="nameOncard"
                            value={this.state.fields.nameOncard}
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            placeholder=""
                        />
                        <Form.Control.Feedback type="invalid">
                            Name on card is required
                                     </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom09">
                        <Form.Label>Credit card number</Form.Label>
                        <Form.Control
                            name="cardNumber"
                            value={this.state.fields.cardNumber}
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            placeholder=""
                        />
                        <Form.Control.Feedback type="invalid">
                            Credit card number is required
                                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="validationCustom10">
                        <Form.Label>Expiration </Form.Label>
                        <Form.Control
                            name="cardExpiration"
                            value={this.state.fields.cardExpiration}
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            placeholder=""
                        />
                        <Form.Control.Feedback type="invalid">
                            Expiration date required
                                     </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom11">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                            name="cvvNumber"
                            value={this.state.fields.cvvNumber}
                            onChange={this.handleInputChange}
                            required
                            type="text"
                            placeholder=""
                        />
                        <Form.Control.Feedback type="invalid">
                            Security code required
                                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Button size="lg" variant="dark" type="submit" style={{ width: '100%' }}>Continue to checkout</Button>
            </Form>
        )
    }
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = {
    purchaseOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckOutForm));