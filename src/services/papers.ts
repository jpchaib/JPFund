export const getPaper = async (params: any, fetchFunction: Function) => {
    let url: string;

    if (params.symbol == "") {
        throw new Error("Please provide a valid symbol");
    }

    switch (true) {
        case params.function == "TIME_SERIES_INTRADAY":
            url = `https://www.alphavantage.co/query?function=${params.function}&symbol=${params.symbol}&interval=${params.interval}&apikey=CFZKMASIH0NJW2GW`;
            break;
        case params.function == "TIME_SERIES_DAILY_ADJUSTED":
            url = `https://www.alphavantage.co/query?function=${params.function}&symbol=${params.symbol}&outputsize=full&apikey=CFZKMASIH0NJW2GW`;
            break;
        default:
            url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&&interval=1min&apikey=CFZKMASIH0NJW2GW`;
            break;
    }

    const response = await fetchFunction(url);
    const json = await response.json();
    if ("Error Message" in json) {
        throw new Error(json["Error Message"]);
    }
    return json;
};

export const getSMA = async (params: any, fetchFunction: Function) => {
    let interval: string = "";
    let url: string;

    switch (true) {
        case params.func == "TIME_SERIES_INTRADAY":
            interval = params.interval;
            break;
        case params.func == "TIME_SERIES_DAILY_ADJUSTED":
            interval = `daily`;
            break;
    }

    url = `https://www.alphavantage.co/query?function=SMA&symbol=${params.symbol}&interval=${interval}&time_period=${params.period}&series_type=${params.seriesType}&apikey=CFZKMASIH0NJW2GW`;
    console.log(url);
    const response = await fetchFunction(url);
    const json = await response.json();
    if ("Error Message" in json) {
        throw new Error(json["Error Message"]);
    }
    return json;
};
