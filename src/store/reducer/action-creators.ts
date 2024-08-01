import {authActionCreators} from '../reducer/auth/action-creators'
import {eventActionCreators} from "./event/action-creators";

//Объединяем action creatorы в один объект, чтобы затем привязать его к dispatch в useAction
export const allActions = {
    ...authActionCreators,
    ...eventActionCreators,
}