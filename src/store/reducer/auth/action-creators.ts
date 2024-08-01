import {authActions, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/user";
import {AppDispatch} from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";


export const authActionCreators = {
    setUser: (user: IUser) : SetUserAction => ({type: authActions.SET_USER, payload: user}),
    setIsAuth: (isAuth: boolean) : SetAuthAction => ({type: authActions.SET_AUTH, payload: isAuth}),
    setError: (error: string) : SetErrorAction => ({type: authActions.SET_ERROR, payload: error}),
    setIsLoading: (isLoading: boolean) : SetIsLoadingAction => ({type: authActions.SET_IS_LOADING, payload: isLoading}),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try{

            //SetTimeout в 1сек для имитации времени загрузки
            setTimeout(async () => {

               dispatch(authActionCreators.setIsLoading(true))
               //const response = await axios.get<IUser[]>('./users.json')
               const response = await UserService.getUsers();
               const mockUser = response.data.find(user => user.username === username && user.password === password)

               if (mockUser) {
                   localStorage.setItem('isAuth', 'true')
                   localStorage.setItem('username', mockUser.username)
                   dispatch(authActionCreators.setIsAuth(true))
                   dispatch(authActionCreators.setUser(mockUser))
               } else {
                   dispatch(authActionCreators.setError("Ошибка авторизации!"))
               }
               dispatch(authActionCreators.setIsLoading(false))
           }, 2000)

        }catch (e){
            dispatch(authActionCreators.setError("Ошибка загрузки страницы!"))
        }

    },

    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('isAuth')
        localStorage.removeItem('username')
        dispatch(authActionCreators.setIsAuth(false))
        dispatch(authActionCreators.setUser({} as IUser))

    }
}