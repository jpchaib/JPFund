import { createContext } from "react";

export type SMA2ContextType = {
    SMA2: Object | null;
    setSMA2: React.Dispatch<React.SetStateAction<Object | null>>;
};

const SMA2ContextState = {
    SMA2: null,
    setSMA2: () => {},
};

export const SMA2Context = createContext<SMA2ContextType>(SMA2ContextState);
