import { useState } from "react";
import "./App.css";
import Market from "./components/market/Market";
import { PaperContext } from "./contexts/PaperContext";
import { SMA2Context } from "./contexts/SMA2Context";
import { SMAContext } from "./contexts/SMAContext";

function App() {
    const [paper, setPaper] = useState<any>({});
    const [SMA, setSMA] = useState<any>({});
    const [SMA2, setSMA2] = useState<any>({});

    return (
        <div className="App">
            <PaperContext.Provider value={{ paper, setPaper }}>
                <SMAContext.Provider value={{ SMA, setSMA }}>
                    <SMA2Context.Provider value={{ SMA2, setSMA2 }}>
                        <Market />
                    </SMA2Context.Provider>
                </SMAContext.Provider>
            </PaperContext.Provider>
        </div>
    );
}

export default App;
