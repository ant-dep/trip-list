import style from "../css/trip.module.css";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { useState } from "react";

interface Trip {
  id: number;
  destination: string;
  address: string;
  imageUrl: string;
  inHabitants: number;
  hotels: number;
  averageIncome: number;
  area: number;
  isActive: boolean;
}

interface Props {
  trip: Trip;
}

export default function Trip({ trip }: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={style.tripContainer}>
      <div className={style.imageContainer}>
        <img src={trip.imageUrl} alt="" />
      </div>
      <div className={style.infoContainer}>
        <div className={style.info}>
          <h2>{trip.destination}</h2>
          <p>{trip.address}</p>
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
          </div>
        </div>
        <div className={style.numbers}>
          <p>
            {`${
              trip.inHabitants.toString().length > 5
                ? trip.inHabitants
                    .toString()
                    .slice(0, trip.inHabitants.toString().length - 6) + "M"
                : trip.inHabitants
            }`}{" "}
            <span>Habitants</span>
          </p>
          <p>
            {trip.hotels} <span>Hôtels</span>
          </p>
          <p>
            {trip.averageIncome} € <span>Revenu Moy</span>
          </p>
          <p>
            {trip.area} <span>km²</span>
          </p>
        </div>
      </div>
    </div>
  );
}
