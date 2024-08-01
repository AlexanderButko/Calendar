import moment, {Moment} from "moment";
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js"

dayjs.extend(isSameOrAfter)

export const rules = {
    required : (message  : string = 'Обязательное поле') => ({
        required: true,
        message,
    }),

    //Кусок из antd/calendar. Позволяет запретить назначение событий на дату в прошлом.
    //Добавляется на DatePicker (точнее, на FormItem дэйтпикера)
    isDateAfter : (message : string) => () => ({
        validator(_ : any, value : Moment){
            if (value.isSameOrAfter(moment())){
                return Promise.resolve();
               // console.log(moment())
            }
            return Promise.reject(new Error(message));
        }
    })
}
