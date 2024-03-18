import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface Reservation {
    id: number;
    startDate: string;
    endDate: string;
    isBooking: boolean;
    room: {
        type: string;
        beds: number;
        price: number;
    };
}

const initialState: Reservation[] = [
    {
        id: 1,
        startDate: '2024-03-20',
        endDate: '2024-03-25',
        isBooking: true,
        room: {
            type: 'Deluxe',
            beds: 2,
            price: 150,
        },
    },
    {
        id: 2,
        startDate: '2024-04-01',
        endDate: '2024-04-05',
        isBooking: true,
        room: {
            type: 'Standard',
            beds: 1,
            price: 100,
        },
    },
    {
        id: 3,
        startDate: '2024-04-10',
        endDate: '2024-04-15',
        isBooking: false,
        room: {
            type: 'Suite',
            beds: 3,
            price: 300,
        },
    },
    {
        id: 4,
        startDate: '2024-05-05',
        endDate: '2024-05-10',
        isBooking: true,
        room: {
            type: 'Deluxe',
            beds: 2,
            price: 200,
        },
    },
    {
        id: 5,
        startDate: '2024-05-20',
        endDate: '2024-05-25',
        isBooking: false,
        room: {
            type: 'Single',
            beds: 1,
            price: 80,
        },
    }
];


export const reservationsSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        removeReservation: (state, action: PayloadAction<number>) => {
            return state.filter(reservation => reservation.id !== action.payload);
        },
        addReservation: (state, action: PayloadAction<Reservation>) => {
            state.push(action.payload);
        },
    },
});

export const { removeReservation, addReservation } = reservationsSlice.actions;


// Selectors
export const selectReservations = (state: RootState) => state.reservations;

export default reservationsSlice.reducer;
