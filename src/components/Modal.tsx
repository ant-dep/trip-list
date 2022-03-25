import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { useState } from "react";
import style from "../css/modal.module.css";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function BasicModal({ open, setOpen }: Props) {
  const [destination, setDestination] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [inHabitants, setInHabitants] = useState(0);
  const [hotels, setHotels] = useState(0);
  const [averageIncome, setAverageIncome] = useState(0);
  const [area, setArea] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (
      destination !== "" &&
      address !== "" &&
      imageUrl !== "" &&
      inHabitants !== 0 &&
      hotels !== 0 &&
      averageIncome !== 0 &&
      area !== 0
    ) {
      let datas = {
        destination,
        address,
        imageUrl,
        inHabitants,
        hotels,
        averageIncome,
        area,
        isActive,
      };
      let storage = window.localStorage.getItem("trips");
      if (storage) {
        let newStorage = JSON.parse(storage);
        newStorage.push(datas);
        window.localStorage.setItem("trips", JSON.stringify(newStorage));
        setOpen(false);
      } else {
        window.localStorage.setItem("trips", JSON.stringify([datas]));
        setOpen(false);
      }
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modal}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Ajouter une nouvelle destination
          </Typography>
          <div className={style.inputContainer}>
            <input
              autoFocus
              type="text"
              placeholder="Destination"
              onChange={(e) => setDestination(e.target.value)}
            />
            <input
              type="text"
              placeholder="Adresse"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Lien de l'image"
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </div>
          <div className={style.inputContainerInline}>
            <input
              type="number"
              placeholder="Nb Habitants"
              onChange={(e) => {
                setInHabitants(parseInt(e.target.value));
              }}
            />
            <input
              type="number"
              placeholder="Nb Hôtels"
              onChange={(e) => {
                setHotels(parseFloat(e.target.value));
              }}
            />
            <input
              type="number"
              placeholder="Revenu Moy"
              onChange={(e) => {
                setAverageIncome(parseInt(e.target.value));
              }}
            />
            <input
              type="number"
              placeholder="Superficie"
              onChange={(e) => {
                setArea(parseFloat(e.target.value));
              }}
            />
          </div>
          <div
            className={style.toggleContainer}
            onClick={() => {
              setTimeout(() => {
                setIsActive(!isActive);
              }, 200);
            }}
          >
            {isActive ? (
              <BsToggle2On className={style.toggleOff} />
            ) : (
              <BsToggle2Off className={style.toggleOn} />
            )}
            <small>Activer</small>
          </div>
          <div className={style.buttonContainer}>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button onClick={handleSubmit}>CONFIRM</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
