import React, { useEffect, useState } from "react";
import style from "./Market.module.scss";
import { getPaper } from "../../services/papers";

const Market = () => {
    const [paper, setPaper] = useState({ "Meta Data": {}, "Time Series (5min)": {} });

    useEffect(() => {
        getPaper("IBM").then((result: any) => setPaper(result));
        console.log(paper);
        console.log(paper["Meta Data"]);
        console.log(paper["Time Series (5min)"]);
    }, []);

    return (
        <div>
            <div></div>
        </div>
    );
};

export default Market;
