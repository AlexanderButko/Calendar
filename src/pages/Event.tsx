import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useAction} from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";

import {IEvent} from "../models/event";
import EventList from "../components/EventList";

const Event : FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalManageVisible, setModalManageVisible] = useState<boolean>(false);

    const {fetchGuests, fetchEvents, setAsyncEvent} = useAction();
    const {guests, events} = useTypedSelector(state => state.eventReducer);
    const {user} = useTypedSelector(state => state.authReducer)

    useEffect( () => {
        fetchGuests();
        fetchEvents(user.username);

    }, [])
    console.log(events)

    /*const eventHandler = (event : IEvent) => {
       setAsyncEvent(event);
       setModalVisible(false);
    }*/
    /*const setClasses = (callback : (classes : string) => void) => {
        return callback('eventForm');
    }*/


    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
                <Button onClick={() => setModalVisible(true)}>
                    Add event
                </Button>
                <Button onClick={() => setModalManageVisible(true)}>
                    Manage events
                </Button>
                <Modal title='Add event'
                       open={modalVisible}
                       footer={null}
                       onCancel={() => setModalVisible(false)}
                >
                    <EventForm
                        guests={guests}
                        visibilityHandler={() => setModalVisible(false)}
                        type = 'Create'/>

                </Modal>

                <Modal
                    title='Manage event'
                    open={modalManageVisible}
                    footer={null}
                    onCancel={() => setModalManageVisible(false)}
                    width='70vw'
                >
                    <EventList/>
                </Modal>
            </Row>
        </Layout>
    );
};

export default Event;