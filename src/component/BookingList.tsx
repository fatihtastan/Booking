import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeReservation, selectReservations } from '../redux/reservationSlice/reservationsSlice';
import { Button, Tag } from 'antd';
import './BookingList.css';


const ResponsiveBookingList: React.FC = () => {
    const dispatch = useDispatch();
    const bookings = useSelector(selectReservations);

    const handleRemove = (id: number) => {
        dispatch(removeReservation(id));
    };

    return (
        <ul className="bookingList">
            {bookings.map((booking) => (
                <li key={booking.id} className="bookingItem">
                    <div className="bookingInfo">
                        <div className="roomType">Room Type: {booking.room.type}</div>
                        <div className="dateRange">
                            Date Range: <Tag color="blue">{booking.startDate}</Tag>
                            <span className="">- </span>
                            <Tag color="blue">{booking.endDate}</Tag>
                        </div>
                    </div>
                    <div className="price">Price: ${booking.room.price}</div>
                    <Button type="primary" onClick={() => handleRemove(booking.id)}>
                        Remove
                    </Button>
                </li>
            ))}
        </ul>
    );
};

export default ResponsiveBookingList;
