import React, { useContext } from "react";
import { PaperContext } from "../../contexts/PaperContext";
import { SMA2Context } from "../../contexts/SMA2Context";
import { SMAContext } from "../../contexts/SMAContext";
import { SMABacktest } from "../../services/papers";

const Profit = () => {
    const { SMA, setSMA } = useContext(SMAContext);
    const { SMA2, setSMA2 } = useContext(SMA2Context);
    const { paper, setPaper } = useContext(PaperContext);

    const handleClick = () => {
        console.log(SMABacktest(paper, SMA, SMA2));
    };

    return (
        <div>
            <div>
                <button onClick={handleClick}> Backtest</button>
            </div>
        </div>
    );
};

export default Profit;
