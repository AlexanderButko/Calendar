import {IUser} from "../../../models/user";
import {IEvent} from "../../../models/event";

export enum eventEnumActions {
    SET_EVENTS = "SET_EVENTS",
    SET_EVENT = "SET_EVENT",
    SET_IS_LOADING_GUESTS = "SET_IS_LOADING_GUESTS",
    SET_GUESTS = "SET_GUESTS",
    SET_ERROR_GUESTS = "SET_ERROR_GUESTS",
    DELETE_EVENT = "DELETE_EVENT",
    UPDATE_EVENT = "UPDATE_EVENT"
}

export interface EventState {
    guests: IUser[];
    isLoadingGuests : boolean;
    errorGuests: string;
    events: IEvent[];
}

export interface SetEventsActionType{
    type: eventEnumActions.SET_EVENTS;
    payload: IEvent[];
}

export interface SetEventActionType{
    type: eventEnumActions.SET_EVENT;
    payload: IEvent;
}

export interface SetIsLoadingGuestsType{
    type: eventEnumActions.SET_IS_LOADING_GUESTS;
    payload: boolean
}

export interface SetErrorGuestsType{
    type: eventEnumActions.SET_ERROR_GUESTS;
    payload: string;
}

export interface SetGuestsActionType{
    type: eventEnumActions.SET_GUESTS;
    payload: IUser[];
}

export interface DeleteEventActionType{
    type: eventEnumActions.DELETE_EVENT;
    payload: IEvent;
}

export interface UpdateEventActionType{
    type: eventEnumActions.UPDATE_EVENT;
    payload: IEvent;
}

export type EventActionType =
    SetEventsActionType |
    SetGuestsActionType |
    SetIsLoadingGuestsType |
    SetErrorGuestsType |
    SetEventActionType |
    DeleteEventActionType |
    UpdateEventActionType;