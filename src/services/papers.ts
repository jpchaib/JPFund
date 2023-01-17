export const getPaperIntraday = async (params: any) => {
    const response = await fetch(`https://www.alphavantage.co/query?function=${params.function}&symbol=${params.symbol}&interval=${params.interval}&apikey=CFZKMASIH0NJW2GW`);
    const json = await response.json();
    if ("Error Message" in json) {
        throw new Error(json["Error Message"]);
    }
    return json;
};

export const getPaperDaily = async (params: any) => {
    const response = await fetch(`https://www.alphavantage.co/query?function=${params.function}&symbol=${params.symbol}&apikey=CFZKMASIH0NJW2GW`);
    const json = await response.json();
    return json;
};
