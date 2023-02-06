import React, { useContext, useEffect, useState } from "react";
import { SMA2Context } from "../../contexts/SMA2Context";
import { SMAContext } from "../../contexts/SMAContext";
import { getSMA } from "../../services/papers";
import style from "./Strategy.module.scss";

interface StrategyProps {
    info: any;
}

const Strategy: React.FC<StrategyProps> = ({ info }) => {
    const { SMA, setSMA } = useContext(SMAContext);
    const { SMA2, setSMA2 } = useContext(SMA2Context);
    const [showError, setShowError] = useState(false);
    const [parameters1, setParameters1] = useState({});
    const [parameters2, setParameters2] = useState({});
    const [symbol, setSymbol] = useState("");
    const [interval, setInterval] = useState("");
    const [func, setFunc] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setSymbol(info.symbol);
        setInterval(info.interval);
        setFunc(info.function);
        getSMA(parameters1, fetch)
            .then((result: any) => {
                setSMA(result);
                setShowError(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
            });
        getSMA(parameters2, fetch)
            .then((result: any) => {
                setSMA2(result);
                setShowError(false);
            })
            .catch((err) => {
                setError(err.message);
                setShowError(true);
            });
    }, [info, parameters1, parameters2]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setParameters1({
            period: event.target.elements.period1.value,
            seriesType: event.target.elements.seriesType.value,
            interval: interval,
            symbol: symbol,
            func: func,
        });
        setParameters2({
            period: event.target.elements.period2.value,
            seriesType: event.target.elements.seriesType.value,
            interval: interval,
            symbol: symbol,
            func: func,
        });
    };

    return (
        <div>
            <div className={style.StrategyForm}>
                <h1>Crossing Simple Moving Averages</h1>
                <form action="/submit" onSubmit={handleSubmit}>
                    <label htmlFor="period1">Period 1:</label>
                    <input type="number" id="period1" />
                    <label htmlFor="period2">Period 2:</label>
                    <input type="number" id="period2" />
                    <label htmlFor="investment">Investment:</label>
                    <input type="number" id="investment" />
                    <select id="seriesType">
                        <option value="low">low </option>
                        <option value="high">high </option>
                        <option value="closed">closed </option>
                        <option value="open">open </option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
                <div>{showError && <h1>{error}</h1>}</div>
            </div>
        </div>
    );
};

export default Strategy;
