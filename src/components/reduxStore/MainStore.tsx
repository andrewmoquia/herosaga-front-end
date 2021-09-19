import { createContext } from "react";

const initialState = {
  sample: false,
};

export const MainStore = createContext<any>(initialState);
