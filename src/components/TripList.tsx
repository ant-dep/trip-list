import GlobalContext from "../context/trips";
import { useContext } from "react";
import Trip from "./Trip";
import style from "../css/tripList.module.css";

export default function TripList() {
  const [State] = useContext(GlobalContext);
  return (
    <div className={style.tripListContainer}>
      {State?.trips?.map((trip, id) => (
        <Trip key={id} trip={trip} />
      ))}
    </div>
  );
}
