import moment, {Moment} from "moment";


export function formDate (date : Date) : string{
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    return `${day}.${month}.${year}`
}

/*export function stringToMoment (dateString : string): Moment{

    const year = dateString.slice(6, 9);
    const day = dateString.slice(0,1);
    const month =  dateString.slice(3,4);

    let date = moment()
    //`${year}-${month}-${day}`
    console.log(date);
    return date;


}*/