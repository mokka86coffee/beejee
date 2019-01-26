import {createStore, applyMiddleware} from 'redux';
import { reducer } from "./Reducers/reducer";
import { Api as apiMiddleware} from './Middlewares/Api';

const fromMiddleware = applyMiddleware(apiMiddleware)(createStore);
const store = fromMiddleware(reducer, { message: {} });

export default store;