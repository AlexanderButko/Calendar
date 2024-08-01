import {IUser} from "../../../models/user";

export enum authActions {
    SET_AUTH = "SET_AUTH",
    SET_USER = "SET_USER",
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING"
}

export interface AuthState{
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
}

export interface SetAuthAction{
    type: authActions.SET_AUTH;
    payload: boolean
}

export interface SetUserAction{
    type: authActions.SET_USER;
    payload: IUser
}

export interface SetErrorAction{
    type: authActions.SET_ERROR;
    payload: string
}

export interface SetIsLoadingAction{
    type: authActions.SET_IS_LOADING;
    payload: boolean;
}

export type AuthAction = SetAuthAction | SetUserAction | SetErrorAction | SetIsLoadingAction;