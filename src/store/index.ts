import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducer/index";
import {AuthAction} from "./reducer/auth/types";



export const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch