import axios, {AxiosResponse} from "axios";
import {IUser} from "../models/user";

//Так как загрузка пользователей происходит в двух разных местах (экшн креэйтор auth и экшн креэйтор event)
//то имеет смысл вынести обращение к api в отдельный файл, дабы исключить дублирование кода и обеспечить
//логическое разбиение

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return axios.get<IUser[]>('./users.json')
    }
}