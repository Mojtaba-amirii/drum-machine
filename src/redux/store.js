import { configureStore } from "@reduxjs/toolkit";
import drumMachineReducer from "./slice";

const store = configureStore({
  reducer: {
    drumMachine: drumMachineReducer,
  },
});

export default store;
