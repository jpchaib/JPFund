import React, { useContext, useEffect, useState } from "react";
import style from "./Market.module.scss";
import { getPaper } from "../../services/papers";
import Graph from "../graph/Graph";
import Strategy from "../strategy/Strategy";
import { PaperContext } from "../../contexts/PaperContext";
import Profit from "../profit/Profit";

const Market = () => {
    const { paper, setPaper } = useContext(PaperContext);
    const [search, setSearch] = useState({});
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSearch({
            function: event.target.elements.function.value,
            symbol: event.target.elements.symbol.value,
            interval: event.target.elements.interval.value,
        });
    };

    const handleChange = (event: any) => {
        setDisabled(event.target.value != "TIME_SERIES_INTRADAY");
    };

    useEffect(() => {
        getPaper(search, fetch)
            .then((result: any) => {
                console.log(result);
                setPaper(result);
                setShowError(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
            });
        console.log(search);
    }, [search]);

    return (
        <div>
            <div>
                <form action="/submit" method="post" onSubmit={handleSubmit}>
                    <label htmlFor="function">Function:</label>
                    <select id="function" onChange={handleChange}>
                        <option value="TIME_SERIES_INTRADAY">IntraDay</option>
                        <option value="TIME_SERIES_DAILY_ADJUSTED">Daily (Adjusted) </option>
                    </select>
                    <label htmlFor="symbol">Symbol:</label>
                    <input type="text" id="symbol" placeholder="IBM" />
                    <label htmlFor="interval">Interval:</label>
                    <select id="interval" disabled={disabled}>
                        <option value="1min">1 min </option>
                        <option value="5min">5 min </option>
                        <option value="15min">15 min </option>
                        <option value="30min">30 min </option>
                        <option value="60min">60 min </option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>{(showError && <h1>{error}</h1>) || <Graph info={paper}></Graph>}</div>
            <div className={style.Strategy}>
                <Strategy info={search}></Strategy>
            </div>
            <div>
                <Profit></Profit>
            </div>
        </div>
    );
};

export default Market;
