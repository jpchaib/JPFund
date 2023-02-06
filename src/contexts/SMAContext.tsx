import { createContext } from "react";

export type SMAContextType = {
    SMA: Object | null;
    setSMA: React.Dispatch<React.SetStateAction<Object | null>>;
};

const SMAContextState = {
    SMA: null,
    setSMA: () => {},
};

export const SMAContext = createContext<SMAContextType>(SMAContextState);
