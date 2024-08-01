import {AuthAction, authActions, AuthState} from "./types";
import {IUser} from "../../../models/user";


const initialState : AuthState = {
    isAuth: false,
    isLoading : false,
    error : '',
    user: {} as IUser
}

export default function authReducer(state = initialState, action : AuthAction) : AuthState{
    switch (action.type) {

        case authActions.SET_AUTH:
            return {...state, isAuth : action.payload, isLoading: false}

        case authActions.SET_ERROR:
            return {...state, error : action.payload, isLoading: false}

        case authActions.SET_IS_LOADING:
            return {...state, isLoading : action.payload}

        case authActions.SET_USER:
            return {...state, user : action.payload, error: ''}

        default: return state;

    }
}