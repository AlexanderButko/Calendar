import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/event";
import {Moment} from "moment";
import {formDate} from "../utils/utils";
import {Dayjs} from "dayjs";

interface EventCalendarProps{
    events: IEvent[];
}
const EventCalendar : FC<EventCalendarProps> = (props) => {

    function dateCellRender (value : Dayjs) {

       const formatedDate = formDate(value.toDate());
       const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
        return (
            <div>
                {currentDayEvents.map(ev =>
                    <div key={ev.id}>
                        {ev.description}
                    </div>)}
            </div>
        );
    }

    return (
        <Calendar
            cellRender={dateCellRender}
        />
    );
};

export default EventCalendar;