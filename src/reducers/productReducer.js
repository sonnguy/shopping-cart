import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCT_BY_ID_BEGIN,
    FETCH_PRODUCT_BY_ID_SUCCESS,
    FETCH_PRODUCT_BY_ID_FAILURE,
    REMOVE_ITEM,
    ADD_TO_CART,
    SUB_QUANTITY,
    ADD_QUANTITY,
    PURCHASE_ORDER,
    SHOW_CART_MODAL,
    HIDE_CART_MODAL
} from "../actions/productAction";

const updateCartItem = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
}
const addOrderConfirmItem = (items) => {
    localStorage.setItem('orderConfirmItem', JSON.stringify(items));
}
const addOrderTotalPrice = (total) => {
    localStorage.setItem('orderTotalPrice', total);
}
const updateProductInStock = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
}
const getProductInStock = () => {
    return JSON.parse(localStorage.getItem('products'));
}
const sumTotalItem = (items) => {
    return items.reduce((sum, { quantity }) => sum + quantity, 0);
}
const sumTotalPrice = (items) => {
    return items.reduce((sum, { quantity, price }) => sum + quantity * price, 0);
}
const getNewAddedItemsAfterAdd = (items, id) => {
    return items.map((product) => {
        if (product.id === id) {
            return Object.assign({}, product, {
                quantity: product.quantity + 1,
            });
        } else {
            return product;
        }
    });
}

const getNewAddedItemsAfterSub = (items, id) => {
    return items.map((product) => {
        if (product.id === id) {
            return Object.assign({}, product, {
                quantity: product.quantity - 1,
            });
        } else {
            return product;
        }
    });
}

const updateRemainingItems = (cartItems) => {
    let products = getProductInStock();

    cartItems.forEach(item => {
        products = products.map((product) => {
            if (product.id === item.id) {
                return Object.assign({}, product, {
                    inventory: product.inventory - item.quantity,
                });
            } else {
                return product;
            }
        });
    });
    updateProductInStock(products);
}

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const totalItem = sumTotalItem(cartItems);

const totalPrice = sumTotalPrice(cartItems);


const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
    addedItems: cartItems,
    total: totalPrice || 0,
    totalItem: totalItem || 0,
    showCartModal: false,
    showCartWarning: false
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }

        case FETCH_PRODUCTS_SUCCESS:
            updateProductInStock(action.payload.products);
            return {
                ...state,
                loading: true,
                products: action.payload.products
            };

        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                product: {},
                error: action.payload.error
            };
        case FETCH_PRODUCT_BY_ID_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }

        case FETCH_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: true,
                product: action.payload.product
            };

        case FETCH_PRODUCT_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                product: {},
                error: action.payload.error
            };
        case ADD_TO_CART: {
            let addedItem = state.products.find(item => item.id === action.id);
            let existed_item = state.addedItems.find(item => action.id === item.id);
            if (existed_item) {
                if (addedItem.inventory === existed_item.quantity) {
                    return {
                        ...state,
                        showCartModal: true,
                        showCartWarning: true
                    }
                } else {
                    const nextAddedItems = getNewAddedItemsAfterAdd(state.addedItems, action.id);
                    updateCartItem(nextAddedItems);
                    return {
                        ...state,
                        addedItems: nextAddedItems,
                        total: state.total + addedItem.price,
                        totalItem: state.totalItem + 1,
                        showCartModal: true
                    }
                }

            }
            else {
                addedItem.quantity = 1;
                let newTotal = state.total + addedItem.price;
                const newAddedItems = [...state.addedItems, addedItem];
                updateCartItem(newAddedItems);
                return {
                    ...state,
                    addedItems: newAddedItems,
                    total: newTotal,
                    totalItem: state.totalItem + 1,
                    showCartModal: true
                }
            }
        }
        case REMOVE_ITEM: {
            let itemToRemove = state.addedItems.find(item => action.id === item.id);
            let newItems = state.addedItems.filter(item => action.id !== item.id);

            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity);
            updateCartItem(newItems);

            return {
                ...state,
                addedItems: newItems,
                total: newTotal,
                totalItem: sumTotalItem(newItems)
            }
        }

        case ADD_QUANTITY: {
            let addedItem = state.products.find(item => item.id === action.id);
            let existed_item = state.addedItems.find(item => action.id === item.id);
            if (addedItem.inventory === existed_item.quantity) {
                return {
                    ...state,
                    showCartWarning: true
                }
            } else {
                let newTotal = state.total + addedItem.price;
                const nextAddedItems = getNewAddedItemsAfterAdd(state.addedItems, action.id);
                updateCartItem(nextAddedItems);
                return {
                    ...state,
                    addedItems: nextAddedItems,
                    total: newTotal,
                    totalItem: state.totalItem + 1
                }
            }
        }

        case SUB_QUANTITY: {
            let addedItem = state.addedItems.find(item => item.id === action.id);
            if (addedItem.quantity === 1) {
                let newItems = state.addedItems.filter(item => item.id !== action.id);
                let newTotal = state.total - addedItem.price;
                updateCartItem(newItems);
                return {
                    ...state,
                    addedItems: newItems,
                    total: newTotal,
                    totalItem: state.totalItem - 1,
                    showCartWarning: false
                }
            }
            else {
                let newTotal = state.total - addedItem.price;
                const nextAddedItems = getNewAddedItemsAfterSub(state.addedItems, action.id);
                updateCartItem(nextAddedItems);
                return {
                    ...state,
                    addedItems: nextAddedItems,
                    total: newTotal,
                    totalItem: state.totalItem - 1,
                    showCartWarning: false
                }
            }
        }

        case PURCHASE_ORDER: {
            updateRemainingItems(state.addedItems);
            addOrderConfirmItem(state.addedItems);
            addOrderTotalPrice(state.total);
            updateCartItem([]);
            return {
                ...state,
                addedItems: [],
                total: 0,
                totalItem: 0
            }
        }
        case SHOW_CART_MODAL: {
            return {
                ...state,
                showCartModal: true
            }
        }

        case HIDE_CART_MODAL: {
            return {
                ...state,
                showCartModal: false,
                showCartWarning: false
            }
        }

        default:
            return state
    }
}




export default productReducer;