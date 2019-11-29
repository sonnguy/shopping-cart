import * as actions from './productAction';

describe('actions', () => {
    it('should create an action to fetch Products Begin', () => {
        const expectedAction = {
            type: actions.FETCH_PRODUCTS_BEGIN,
        }
        expect(actions.fetchProductsBegin()).toEqual(expectedAction)
    })

    it('should create an action to fetch Products Success', () => {
        const products = [];

        const expectedAction = {
            type: actions.FETCH_PRODUCTS_SUCCESS,
            payload: { products }
        }
        expect(actions.fetchProductsSuccess(products)).toEqual(expectedAction)
    })

    it('should create an action to fetch Products Fail', () => {
        const error = null;

        const expectedAction = {
            type: actions.FETCH_PRODUCTS_FAILURE,
            payload: { error }
        }
        expect(actions.fetchProductsFailure(error)).toEqual(expectedAction)
    })
})