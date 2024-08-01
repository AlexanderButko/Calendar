import React, {FC, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/user";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/event";
import {Moment} from "moment";
import {formDate} from "../utils/utils";
import {useAction} from "../hooks/useAction";

interface EventFormProps {
    guests: IUser[];
    type: string;
    //Необязательный, тк используем только при апдейте события
    updatingEvent?: IEvent;
    visibilityHandler: () => void;
    //submit: (event : IEvent) => void;
}

const EventForm : FC<EventFormProps> = (props) => {

    const {setAsyncEvent, updateAsyncEvent} = useAction()
    const [event, setEvent] = useState<IEvent>({id: '', author: '', guest: '', date: '', description: ''});
    const {user} = useTypedSelector(state => state.authReducer);
    const [form] = Form.useForm();

    //Если обновляем событие, то разворачиваем в event событие, передаваемое из EventList

    useEffect(() => {
        if(props.type === 'Update') {
            props.updatingEvent && setEvent(props.updatingEvent)

        }
        return () => setEvent({id: '', author: '', guest: '', date: '', description: ''})

    }, [props.updatingEvent]);


    //Исп. библиотеки Moment
    const selectDate = (date : Moment | null) => {
        date && setEvent({...event, date: formDate(date.toDate())});
    }

    const submitForm = () => {
        props.type === 'Update'
            ? updateAsyncEvent({...event, author: user.username})
            : setAsyncEvent({...event, author: user.username, id: Date.now().toString()})
        form.resetFields();
        props.visibilityHandler();

    }

    return (
        <Form

            form={form}
            onFinish={submitForm}

        >
            <Form.Item
                label="Description"
                name="description"
                rules={[rules.required()]}
                valuePropName={event.description}
            >
                <Input
                    value = {event.description}
                    onChange={e => setEvent({...event, description: e.target.value})}
                />
            </Form.Item>


            <Form.Item
                label="Date"
                name="date"
                rules={[rules.required(), rules.isDateAfter('Дата в прошлом!')]}

            >
                <DatePicker
                    onChange={(date: Moment | null) => selectDate(date)}
                />
            </Form.Item>

            {/*<DatePicker
                value = {stringToMoment(event.date)}
                onChange={(date: Moment | null) => selectDate(date)}
            />*/}

            <Form.Item>
                <Select value = {event.guest}
                        onChange={(guest : string) => setEvent({...event, guest: guest})}
                >
                    {props.guests.map(
                        guest => <Select.Option
                            key = {guest.id}
                            value={guest.username}
                            children = {guest.username}
                        />)
                    }
                </Select>
            </Form.Item>

            <Form.Item>
                <Row justify="end">
                    <Button type="primary" htmlType="submit">
                        {props.type}
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default EventForm ;