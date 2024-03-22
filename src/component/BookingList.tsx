// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeReservation, selectReservations } from '../redux/reservationSlice/reservationsSlice';
// import { Button, Tag } from 'antd';
// import './BookingList.css';

// const ResponsiveBookingList: React.FC = () => {
//     const dispatch = useDispatch();
//     const bookings = useSelector(selectReservations);

//     const handleRemove = (id: number) => {
//         dispatch(removeReservation(id));
//     };

//     return (
//         <ul className="bookingList">
//             {bookings.map((booking) => (
//                 <li key={booking.id} className="bookingItem">
//                     <div className="bookingInfo">
//                         <div className="roomType">Room Type: {booking.room.type}</div>
//                         <div className="dateRange">
//                             Date Range: <Tag color="blue">{booking.startDate}</Tag>
//                             <span className="">- </span>
//                             <Tag color="blue">{booking.endDate}</Tag>
//                         </div>
//                     </div>
//                     <div className="price">Price: ${booking.room.price}</div>
//                     <Button type="primary" onClick={() => handleRemove(booking.id)}>
//                         Remove
//                     </Button>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default ResponsiveBookingList;

// ResponsiveBookingList.tsx
import React, { useState } from 'react';
import { Button, Modal, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  Reservation,
  removeReservation,
  selectReservations,
  updateReservation
} from '../redux/reservationSlice/reservationsSlice';
import BookingRangePicker from './BookingRangePicker';
import './BookingList.css';

const ResponsiveBookingList: React.FC = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectReservations);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  const showEditModal = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setIsModalVisible(true);
  };

  const handleEditSave = (newStartDate: string, newEndDate: string) => {
    if (editingReservation) {
      dispatch(
        updateReservation({
          ...editingReservation,
          startDate: newStartDate,
          endDate: newEndDate
        })
      );
      setIsModalVisible(false);
      setEditingReservation(null);
    }
  };

  return (
    <ul className="bookingList">
      {bookings.map((booking: Reservation) => (
        <li key={booking.id} className="bookingItem">
          <div className="bookingInfo">
            <div className="roomType">Room Type: {booking.room.type}</div>
            <div className="dateRange">
              Date Range: <Tag color="blue">{booking.startDate}</Tag> -{' '}
              <Tag color="blue">{booking.endDate}</Tag>
            </div>
            <div className="price">Price: ${booking.room.price}</div>
          </div>
          <Button type="primary" onClick={() => showEditModal(booking)}>
            Edit
          </Button>
          <Button onClick={() => dispatch(removeReservation(booking.id))}>
            Remove
          </Button>
        </li>
      ))}
      <Modal
        destroyOnClose
        title="Edit Reservation"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {editingReservation && (
          <BookingRangePicker
            onSave={handleEditSave}
            mode="Edit"
            editingReservation={editingReservation}
          />
        )}
      </Modal>
    </ul>
  );
};

export default ResponsiveBookingList;
