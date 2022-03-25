import React, { createContext, FC, useEffect, useReducer } from "react";

enum TripType {
  LOAD_TRIPS = "LOAD_TRIPS",
  MODIFY_TRIP = "MODIFY_TRIP",
}

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
interface State {
  trips: Trip[];
}

const defaultState: State = {
  trips: [],
};

type LoadTripsAction = {
  type: typeof TripType.LOAD_TRIPS;
  payload: Trip[];
};

type ModifyTripAction = {
  type: typeof TripType.MODIFY_TRIP;
  payload: Trip;
};

type TripActionTypes = LoadTripsAction | ModifyTripAction;

export const modifyTrip = (trip: Trip): ModifyTripAction => ({
  type: TripType.MODIFY_TRIP,
  payload: trip,
});

export const loadTrips = (trips: Trip[]): LoadTripsAction => ({
  type: TripType.LOAD_TRIPS,
  payload: trips,
});

const GlobalContext = createContext<[State, React.Dispatch<TripActionTypes>]>([
  defaultState,
  () => {},
]);

export default GlobalContext;

export const reducer = (state: State, action: TripActionTypes): State => {
  switch (action.type) {
    case TripType.LOAD_TRIPS:
      return {
        ...state,
        trips: action.payload,
      };
    case TripType.MODIFY_TRIP:
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === action.payload.id ? action.payload : trip
        ),
      };
    default:
      return state;
  }
};

export const TripsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  let storage = localStorage.getItem("trips");

  useEffect(() => {
    storage && dispatch(loadTrips(JSON.parse(storage)));
  }, [storage]);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};
