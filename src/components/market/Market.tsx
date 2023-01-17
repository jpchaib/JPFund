import React, { useEffect, useState } from "react";
import style from "./Market.module.scss";
import { getPaperIntraday } from "../../services/papers";
import Graph from "../graph/Graph";

const Market = () => {
    const [paper, setPaper] = useState({});
    const [search, setSearch] = useState({});
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSearch({
            function: event.target.elements.function.value,
            symbol: event.target.elements.symbol.value,
            interval: event.target.elements.interval.value,
        });
        console.log(event);
    };

    useEffect(() => {
        getPaperIntraday(search)
            .then((result: any) => {
                setPaper(result["Time Series (5min)"]);
                setShow(false);
                console.log(result);
            })
            .catch((err) => {
                setError(err.message);
                setShow(true);
            });
    }, [search]);

    return (
        <div>
            <div>
                <form action="/submit" method="post" onSubmit={handleSubmit}>
                    <label htmlFor="function">Function:</label>
                    <input type="text" id="function" name="function" />
                    <label htmlFor="symbol">Symbol:</label>
                    <input type="text" id="symbol" name="symbol" />
                    <label htmlFor="interval">Interval:</label>
                    <input type="text" id="interval" name="interval" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>{show && <h1>{error}</h1>}</div>
            {show || <Graph info={paper}></Graph>}
        </div>
    );
};

export default Market;
