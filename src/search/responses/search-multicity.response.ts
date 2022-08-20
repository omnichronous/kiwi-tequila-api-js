import { SearchRoute } from "../interfaces";

export interface SearchMultiCityResponse {
    /**
     * security token
     */
    booking_token: string;
    /**
     * total price of the booking
     */
    price: number;
    /**
     * 
     */
    route: SearchRoute[];
}
