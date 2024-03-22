import './App.css';
import BookingList from './component/BookingList';
import BookingRangePicker from './component/BookingRangePicker';

function App() {
  return (
    <div>
      <h1>Reservation List</h1>
      <BookingRangePicker mode="Add" />
      <BookingList />
    </div>
  );
}

export default App;
