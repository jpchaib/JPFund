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
    } else if ("Note" in json) {
        throw new Error(json["Note"]);
    }
    const seriesName: string = Object.keys(json)[1];
    return json[seriesName];
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
    const seriesName: string = Object.keys(json)[1];
    return json[seriesName];
};

export const organizeCandleData = (info: any) => {
    const seriesData: any = [];
    Object.keys(info).forEach((key) => {
        let x = key;
        let y = [info[key]["1. open"], info[key]["2. high"], info[key]["3. low"], info[key]["4. close"]];

        seriesData.push({
            x: x,
            y: y,
        });
    });

    if (Object.keys(info)[0].length > 10) {
        const closure = new Date("1970-01-01T16:00:00").getTime();
        const aperture = new Date("1970-01-01T10:00:00").getTime();
        const output = seriesData.filter((element: { x: string }) => new Date("1970-01-01T" + element.x.split(" ")[1]).getTime() >= aperture && new Date("1970-01-01T" + element.x.split(" ")[1]).getTime() <= closure);
        return output;
    }

    return seriesData;
};

export const organizeLineData = (info: any) => {
    const seriesData: any = [];
    Object.keys(info).forEach((key) => {
        let x = key;
        let y = info[key]["SMA"];

        seriesData.push({
            x: x,
            y: y,
        });
    });
    return seriesData;
};

export const SMABacktest = (candles: any, SMA1: any, SMA2: any) => {
    console.log(candles);
    console.log(SMA1);
    console.log(SMA2);
    let position: string = "BUY";
    let profit: number = 0;
    let info: any = {
        date: [],
        type: [],
        price: [],
        profit: [],
        SMA1: [],
        SMA2: [],
    };
    console.log(info);
    Object.keys(candles).forEach((key) => {
        if (SMA2[key] == undefined || SMA1[key] == undefined) {
            return info;
        }
        console.log(SMA1[key]["SMA"] as number);
        console.log(SMA2[key]["SMA"] as number);
        if (SMA1[key]["SMA"] > SMA2[key]["SMA"] && position == "BUY") {
            info["date"].push(key);
            info["type"].push(position);
            info["price"].push(candles[key]["4. close"]);
            info["SMA1"].push(SMA1[key]["SMA"]);
            info["SMA2"].push(SMA2[key]["SMA"]);
            profit = profit - parseInt(candles[key]["4. close"]);
            info["profit"].push(profit);
            position = "SELL";
            console.log(info);
        }
        if (SMA1[key]["SMA"] < SMA2[key]["SMA"] && position == "SELL") {
            info["date"].push(key);
            info["type"].push(position);
            info["price"].push(candles[key]["4. close"]);
            info["SMA1"].push(SMA1[key]["SMA"]);
            info["SMA2"].push(SMA2[key]["SMA"]);
            profit = profit + parseInt(candles[key]["4. close"]);
            info["profit"].push(profit);
            position = "BUY";
            console.log(info);
        }
    });
    return info;
};
