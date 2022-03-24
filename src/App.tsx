import "./css/App.css";
import Modal from "./components/Modal";
import TripList from "./components/TripList";

function App() {
  return (
    <div className="App">
      <Modal />
      <TripList />
    </div>
  );
}

export default App;
