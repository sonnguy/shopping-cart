import React from 'react';

const ProductDiscountTag = ({ discount }) => {

    return (
        discount > 0 ?
            <div className="product-discount-tag text-center">
                <div>{discount}%</div>
                <div>OFF</div>
            </div>
            : null
    )
}

export default ProductDiscountTag;