import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import { addReservation } from '../redux/reservationSlice/reservationsSlice';

const { RangePicker } = DatePicker;

const BookingRangePicker: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedDates, setSelectedDates] = useState<[moment.Moment | null, moment.Moment | null]>([null, null]);

    const handleAddClick = () => {
        if (selectedDates[0] && selectedDates[1]) {
            const newReservation = {
                id: Math.random(),
                startDate: selectedDates[0].format('YYYY-MM-DD'),
                endDate: selectedDates[1].format('YYYY-MM-DD'),
                isBooking: true,
                room: {
                    type: 'Standard',
                    beds: 1,
                    price: 100,
                },
            };
            dispatch(addReservation(newReservation));
            setSelectedDates([null, null]); // Tarih seçimini sıfırla
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <RangePicker
                onChange={(dates) => setSelectedDates(dates)}
            />
            <Button onClick={handleAddClick}>Add</Button>
        </div>
    );
};

export default BookingRangePicker;
