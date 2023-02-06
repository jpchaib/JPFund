import { getPaper } from "./papers";
import { mockFetch } from "../mocks/mockFetch";
import { mockIntra, mockDaily, mockWeekly } from "../mocks/mockData";

const params1: Object = {
    function: "TIME_SERIES_INTRADAY",
    symbol: "IBM",
    interval: "5min",
};

describe("getPaper", () => {
    it("should fetch JSON data from the API", async () => {
        const data = await getPaper(params1, mockFetch);
        expect(data).toBe(mockIntra);
    });
});
