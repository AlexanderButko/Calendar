import {IUser} from "../../../models/user";
import {
    DeleteEventActionType,
    eventEnumActions,
    SetErrorGuestsType,
    SetEventActionType,
    SetEventsActionType,
    SetGuestsActionType,
    SetIsLoadingGuestsType,
    UpdateEventActionType
} from "./types";
import {IEvent} from "../../../models/event";
import {AppDispatch} from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const eventActionCreators = {
    setGuests: (guests: IUser[]) : SetGuestsActionType => ({type: eventEnumActions.SET_GUESTS, payload: guests}),
    setEvents: (events: IEvent[]) : SetEventsActionType => ({type: eventEnumActions.SET_EVENTS, payload: events}),
    setEvent: (event: IEvent) : SetEventActionType => ({type: eventEnumActions.SET_EVENT, payload: event}),
    setIsLoadingGuests: (loading: boolean) : SetIsLoadingGuestsType => ({type: eventEnumActions.SET_IS_LOADING_GUESTS, payload: loading}),
    setErrorGuests: (error : string) : SetErrorGuestsType => ({type: eventEnumActions.SET_ERROR_GUESTS, payload: error}),
    deleteEvent: (event: IEvent) : DeleteEventActionType => ({type: eventEnumActions.DELETE_EVENT, payload: event}),
    updateEvent: (event: IEvent) : UpdateEventActionType => ({type: eventEnumActions.UPDATE_EVENT, payload: event}),

    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(eventActionCreators.setIsLoadingGuests(true));
            //const response = await axios.get<IUser[]>('./users.json');
            const response = await UserService.getUsers();
            dispatch(eventActionCreators.setGuests(response.data));
            dispatch(eventActionCreators.setIsLoadingGuests(false));
        }
        catch (e){
            dispatch(eventActionCreators.setErrorGuests("Ошибка загрузки гостей!"));
        }
    },

    fetchEvents: (username : string) => async (dispatch : AppDispatch) => {

        const response = await axios.get<IEvent[]>('http://localhost:5000/posts');
        //console.log(response.data)
        //dispatch(eventActionCreators.setEvents(response.data));
        const currentUserEvents = response.data.filter(ev => ev.author === username || ev.guest === username);
        dispatch(eventActionCreators.setEvents(currentUserEvents));
    },

    setAsyncEvent: (event : IEvent) => async (dispatch : AppDispatch) => {

        await axios.post('http://localhost:5000/posts', event);
        dispatch(eventActionCreators.setEvent(event));

    },

    deleteAsyncEvent: (event : IEvent) => async (dispatch : AppDispatch) => {
        await axios.delete(`http://localhost:5000/posts/${event.id}`, {
            data: event
        });
        dispatch(eventActionCreators.deleteEvent(event));
    },

    updateAsyncEvent: (event: IEvent) => async (dispatch : AppDispatch) => {
        await axios.put(`http://localhost:5000/posts/${event.id}`,
            event
        )
        dispatch(eventActionCreators.updateEvent(event))
    }
}