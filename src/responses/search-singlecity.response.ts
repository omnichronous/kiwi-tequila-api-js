import { SearchSingleCityDto } from "../dtos";
import { SearchFlightRoute } from "../interfaces";
import { Currency } from "../types";

/**
 * The search_response serves as an example of the valid
 * HTTP request (search_response itself is not an object
 * of the search API).
 */
export interface SearchSingleCityResponse {
    /**
     * The currency parameter contains a currency code.
     * See fx_rate response parameter as well.
     */
    currency: Currency;

    /**
     * The data parameter is a list of individual
     * itineraries where each itinerary is a JSON object.
     */
    data: SearchFlightRoute[];

    /**
     * The fx_rate parameter is used instead of currency_rate.
     * It contains a reverse value of the currency rate, meaning
     * that it displays how much is 1 EUR in the requested
     * currency (for example one GDP can be 0.84). If you have
     * not requested another currency with curr request parameter,
     * the value of fx_rate is 1, as the currency rate to the same
     * currency is 1 equal to 1.
     */
    fx_rate: number;

    // undocumented
    search_params: SearchSingleCityDto;
    all_stopover_airports: string[];
    sort_version: number;
}