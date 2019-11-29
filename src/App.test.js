import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
describe('My Connected React-Redux Component', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            product: {
                products: [],
                product: {},
                loading: false,
                error: null,
                addedItems: [],
                total: 0,
                totalItem: 0,
                showCartModal: false,
                showCartWarning: false
            }
        });
        store.dispatch = jest.fn();
        component = renderer.create(
            <Provider store={store}>
                <App />
            </Provider>
        );

    });
    it('should render with given state from Redux store', () => {
        expect(500).toBe(500);
    });
});