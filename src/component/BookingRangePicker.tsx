import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker, Button } from 'antd';
import {
  Reservation,
  addReservation,
  selectReservations
} from '../redux/reservationSlice/reservationsSlice';
import { useSelector } from 'react-redux';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const { RangePicker } = DatePicker;
interface BookingRangePickerProps {
  editingReservation?: Reservation | null;
  mode: string;
  onSave?: (startDate: string, endDate: string) => void;
}
const BookingRangePicker: React.FC<BookingRangePickerProps> = ({
  editingReservation,
  mode,
  onSave
}) => {
  const dispatch = useDispatch();
  const [selectedDates, setSelectedDates] = useState<
    [Dayjs | null, Dayjs | null]
  >([
    editingReservation?.startDate ? dayjs(editingReservation?.startDate) : null,
    editingReservation?.endDate ? dayjs(editingReservation?.endDate) : null
  ]);
  const reservations = useSelector(selectReservations);

  const handleAddClick = () => {
    if (!selectedDates[0] || !selectedDates[1]) {
      alert('Please select a valid date range.');
      return;
    }
    const newReservation = {
      id: Date.now(),
      startDate: selectedDates[0].format('YYYY-MM-DD'),
      endDate: selectedDates[1].format('YYYY-MM-DD'),
      isBooking: true,
      room: {
        type: 'Standard',
        beds: 1,
        price: 100
      }
    };

    dispatch(addReservation(newReservation));
    setSelectedDates([null, null]);
  };

  const handleEditClick = () => {
    const [startDate, endDate] = selectedDates;
    if (startDate && endDate) {
      !!onSave &&
        onSave(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
      setSelectedDates([null, null]);
    } else {
      alert('Please select a valid date range.');
    }
  };

  const disabledDate = (current: Dayjs) => {
    if (current && current < dayjs().startOf('day')) {
      return true;
    }

    return reservations
      .filter((reservation) => {
        return reservation.id !== editingReservation?.id;
      })
      .some((reservation) => {
        const startDate = dayjs(reservation.startDate, 'YYYY-MM-DD');
        const endDate = dayjs(reservation.endDate, 'YYYY-MM-DD');
        if (
          current.isSame(startDate, 'day') ||
          current.isSame(endDate, 'day')
        ) {
          return true;
        }
        return current.isAfter(startDate) && current.isBefore(endDate);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}
    >
      <RangePicker
        format="YYYY-MM-DD"
        disabledDate={disabledDate}
        onChange={(value) => {
          const [startDate, endDate] = value || [];
          const isOverlapping = reservations
            .filter((reservation) => reservation.id !== editingReservation?.id)
            .some((reservation) => {
              const start = dayjs(reservation.startDate);
              const end = dayjs(reservation.endDate);
              return (
                startDate?.isSameOrBefore(end, 'day') &&
                endDate?.isSameOrAfter(start, 'day')
              );
            });

          if (isOverlapping) {
            alert('Selected date range overlaps with an existing booking.');
            return;
          }

          setSelectedDates([
            startDate ? dayjs(startDate, 'YYYY-MM-DD') : null,
            endDate ? dayjs(endDate, 'YYYY-MM-DD') : null
          ]);
        }}
        value={selectedDates}
      />
      <Button
        disabled={!selectedDates[0] && !selectedDates[1]}
        onClick={mode === 'Edit' ? handleEditClick : handleAddClick}
      >
        {mode}
      </Button>
    </div>
  );
};

export default BookingRangePicker;
