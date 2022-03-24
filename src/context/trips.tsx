import React, { createContext, FC, useEffect, useReducer } from "react";

enum TripType {
  LOAD_TRIPS = "LOAD_TRIPS",
  ADD_TRIP = "ADD_TRIP",
}

interface Trip {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface State {
  trips: Trip[];
  addTrip?: (trip: Trip) => void;
}

const defaultState: State = {
  trips: [],
};

type LoadTripsAction = {
  type: typeof TripType.LOAD_TRIPS;
  payload: Trip[];
};

type AddTripAction = {
  type: typeof TripType.ADD_TRIP;
  payload: Trip;
};

type TripActionTypes = LoadTripsAction | AddTripAction;

export const addTrip = (trip: Trip): AddTripAction => ({
  type: TripType.ADD_TRIP,
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
    case TripType.ADD_TRIP:
      return {
        ...state,
        trips: [...state.trips, action.payload],
      };
    default:
      return state;
  }
};

export const TripsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    let localTrips = window.localStorage.getItem("trips");
    if (localTrips) {
      dispatch(loadTrips(JSON.parse(localTrips)));
    }
  }, []);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};
