import { useState } from "react";
import "./App.css";
import Market from "./components/market/Market";
import { PaperContext } from "./contexts/PaperContext";
import { SMAContext } from "./contexts/SMAContext";

function App() {
    const [paper, setPaper] = useState<any>({});
    const [SMA, setSMA] = useState<any>({});

    return (
        <div className="App">
            <PaperContext.Provider value={{ paper, setPaper }}>
                <SMAContext.Provider value={{ SMA, setSMA }}>
                    <Market />
                </SMAContext.Provider>
            </PaperContext.Provider>
        </div>
    );
}

export default App;
