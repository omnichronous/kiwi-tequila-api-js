import { SearchFlightRoute } from "../interfaces";

export interface SearchMultiCityResponse extends Pick<SearchFlightRoute, "booking_token"> {
    /**
     * total price of the booking
     */
    price: number;
    /**
     * 
     */
    route: SearchFlightRoute[];
}
