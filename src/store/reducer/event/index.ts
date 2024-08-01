import {EventActionType, eventEnumActions, EventState} from "./types";
import {IEvent} from "../../../models/event";

const initialState : EventState = {
    guests: [],
    events:[],
    isLoadingGuests: false,
    errorGuests: '',
}


export default function eventReducer (state = initialState, action : EventActionType) : EventState{
    switch (action.type) {
        case eventEnumActions.SET_EVENTS:
            return {...state, events : action.payload}

        case eventEnumActions.SET_EVENT:
            return {...state, events : [...state.events, action.payload]}

        case eventEnumActions.SET_GUESTS:
            return {...state, guests: action.payload}

        case eventEnumActions.SET_IS_LOADING_GUESTS:
            return {...state, isLoadingGuests: action.payload}

        case eventEnumActions.SET_ERROR_GUESTS:
            return {...state, errorGuests: action.payload}

        case eventEnumActions.DELETE_EVENT:
            return {...state, events: [...state.events.filter(ev => ev.id != action.payload.id)]}

        case eventEnumActions.UPDATE_EVENT:
            return {...state, events: [...state.events.filter(ev => ev.id != action.payload.id), action.payload]}

        default: return state;

    }
}