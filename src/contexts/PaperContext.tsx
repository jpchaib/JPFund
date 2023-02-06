import { createContext } from "react";

export type PaperContextType = {
    paper: Object | null;
    setPaper: React.Dispatch<React.SetStateAction<Object | null>>;
};

const paperContextState = {
    paper: null,
    setPaper: () => {},
};

export const PaperContext = createContext<PaperContextType>(paperContextState);
