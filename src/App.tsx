import { useState } from "react";
import Modal from "./components/Modal";
import TripList from "./components/TripList";
import style from "./css/app.module.css";
import { ColorButton } from "./css/addButton";
import { AiOutlinePlus } from "react-icons/ai";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className={style.app}>
      <div className={style.header}>
        <h1>Destinations</h1>
        <ColorButton
          variant="contained"
          className={style.button}
          onClick={() => setOpen(true)}
        >
          <AiOutlinePlus size={15} color="white" />
          <span>Ajouter</span>
        </ColorButton>
      </div>
      <Modal open={open} setOpen={setOpen} />
      <TripList />
    </div>
  );
}

export default App;
