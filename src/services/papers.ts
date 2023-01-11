export const getPaper = async (name: String) => {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${name}&interval=5min&apikey=demo`);
    const json = await response.json();
    return json;
};
