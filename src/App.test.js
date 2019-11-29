import React from 'react';
import ReactDOM from 'react-dom';
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
            hideCartModal: false
        });
        store.dispatch = jest.fn();
        component = renderer.create(
            <Provider store={store}>
                <App />
            </Provider>
        );

    });
    it('should render with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
});