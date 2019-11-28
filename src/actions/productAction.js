import { getProducts, getProductById } from '../api/productApi';

export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_PRODUCT_BY_ID_BEGIN = 'FETCH_PRODUCT_BY_ID_BEGIN';
export const FETCH_PRODUCT_BY_ID_SUCCESS = 'FETCH_PRODUCT_BY_ID_SUCCESS';
export const FETCH_PRODUCT_BY_ID_FAILURE = 'FETCH_PRODUCT_BY_ID_FAILURE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const PURCHASE_ORDER = 'PURCHASE_ORDER';
export const SHOW_CART_MODAL = 'SHOW_CART_MODAL';
export const HIDE_CART_MODAL = 'HIDE_CART_MODAL';

export const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products }
});

export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: { error }
});
export const fetchProductByIdBegin = () => ({
    type: FETCH_PRODUCT_BY_ID_BEGIN
});

export const fetchProductByIdSuccess = product => ({
    type: FETCH_PRODUCT_BY_ID_SUCCESS,
    payload: { product }
});

export const fetchProductByIdFailure = error => ({
    type: FETCH_PRODUCT_BY_ID_FAILURE,
    payload: { error }
});

export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }
}

export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}

export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}

export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    }
}

export const purchaseOrder = () => {
    return {
        type: PURCHASE_ORDER
    }
}


export const showCartModal = () => {
    return {
        type: SHOW_CART_MODAL
    }
}

export const hideCartModal = () => {
    return {
        type: HIDE_CART_MODAL
    }
}

export const checkStockAvailable = (id) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const addedItem = products.find(item => item.id === id);
    return addedItem.inventory > 0 ? true : false;
}

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsBegin());
        return getProducts()
            .then(res => {
                dispatch(fetchProductsSuccess(res))
            })
            .catch(error =>
                dispatch(fetchProductsFailure(error))
            );
    }
}

export const fetchProductById = (id) => {
    return dispatch => {
        dispatch(fetchProductByIdBegin());
        return getProductById(id)
            .then(res => {
                dispatch(fetchProductByIdSuccess(res))
            })
            .catch(error =>
                dispatch(fetchProductByIdFailure(error))
            );
    }
}