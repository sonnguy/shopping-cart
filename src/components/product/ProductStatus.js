import React from 'react';

const ProductStatus = ({ inventory }) => {
    const status = inventory === 0 ? 'Sold out' : (inventory < 3) ? 'Low stock' : '';
    return (
        <span className="product-status">{status}</span>
    )
}

export default ProductStatus;