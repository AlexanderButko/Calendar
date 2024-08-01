import React, {FC, useState} from 'react';
import {AiOutlineCloseCircle} from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import {useAction} from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/event";
import EventForm from "./EventForm";
import { AiFillDelete } from "react-icons/ai";



const EventList : FC= () => {

    const initialEvent = {id: '', author: '', guest: '', date: '', description: ''};
    const {deleteAsyncEvent} = useAction();
    const {events, guests} = useTypedSelector(state => state.eventReducer);
    const {user} = useTypedSelector(state => state.authReducer);
    const [updatingEvent, setUpdatingEvent] = useState<IEvent>(initialEvent);
    //const [updateVisible, setUpdateVisible] = useState<boolean>(false);

    const [classes, setClasses] = useState<string>('eventForm');
    const [delClassState, setDelClassState] = useState<string>('deleteElement');
    let classArr = ['eventForm'];
    let delClasses = ['deleteElement'];



    const handleUpdate = (event : IEvent) => {

            setUpdatingEvent(event);

            classArr.push('active');
            delClasses.push('disable');
            setClasses(classArr.join(' '));
            setDelClassState(delClasses.join(' '));

    }

    const visibilityHandler = () => {
        setClasses('eventForm');
        setDelClassState('deleteElement');
    }

    const closeEventFormWindow = () => {
        classArr.slice(0);
        delClasses.slice(0);
        setClasses(classArr.join());
        setDelClassState(delClasses.join())

    }

    return (
        <div >
            <ul>
                {events.filter(ev => ev.author === user.username).map(
                    ev =>
                        <li key = {ev.id} className = 'eventModal'>
                            {ev.author} {'->'} {ev.guest} {'->'} {ev.date} {'->'} {ev.description}

                            <div className='button-container'>
                                <AiFillDelete
                                    className={delClassState}
                                    onClick={() => deleteAsyncEvent(ev)}
                                />
                                <AiFillEdit
                                    onClick={() => handleUpdate(ev)}
                                />
                            </div>
                        </li>
                )}
            </ul>
            <div className={classes}>

                <AiOutlineCloseCircle
                    className='closeElem'
                    onClick={closeEventFormWindow}
                />

                <EventForm

                    guests={guests}
                    type = 'Update'
                    //visibilityHandler={() => setClasses('eventForm')}
                    visibilityHandler={visibilityHandler}
                    updatingEvent={updatingEvent}
                />
            </div>
        </div>
    );
};

export default EventList;