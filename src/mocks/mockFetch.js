import { mockIntra, mockDaily, mockWeekly } from "../mocks/mockData";

export const mockFetch = (url) => {
    switch (url) {
        case `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=CFZKMASIH0NJW2GW`: {
            return {
                ok: true,
                status: 200,
                json: async () => mockIntra,
            };
        }
        case `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=CFZKMASIH0NJW2GW`: {
            return {
                ok: true,
                status: 200,
                json: async () => mockDaily,
            };
        }
        case `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=CFZKMASIH0NJW2GW`: {
            return {
                ok: true,
                status: 200,
                json: async () => mockWeekly,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
};
