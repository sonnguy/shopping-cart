import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './productAction';
// import fetchMock from 'fetch-mock';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
    // afterEach(() => {
    //     fetchMock.restore()
    // })
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

    it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {

        const products = require('./data/products.json');

        const expectedActions = [
            { type: actions.FETCH_PRODUCTS_BEGIN },
            { type: actions.FETCH_PRODUCTS_SUCCESS, body: { products: products } }
        ]
        const store = mockStore({ products: [] })

        return store.dispatch(actions.fetchProducts()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})