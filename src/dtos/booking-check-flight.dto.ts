import { Currency } from "../types";
import { BookingDto } from "./booking.dto";

export interface BookingCheckFlightDto extends BookingDto {
    /**
     * The number of bags for the entire booking, even
     * if bags_price states that the first (or even second)
     * checked baggage is free, it is necessary to request it.
     * 
     * Example : 2
     */
    bnum: number;
    /**
     * The adults is a required parameter that represents
     * the number of adult travelers. There has to be at
     * least one adult in the booking.
     * 
     * Example : 1
     */
    adults: number;
    /**
     * The children is a required parameter that represents
     * the number of children travelers.
     * 
     * Example : 0
     */
    children: number;
    /**
     * The infants is a required parameter that represents
     * the number of infant travelers.
     * 
     * Example : 1
     */
    infants: number;
    /**
     * Conversion will be in chosen currency, but the total price
     * and other prices are always in EUR. Default in EUR.
     * 
     * Example : USD
     */
    currency?: Currency;
    /**
     * User’s session id, should be unique per user. If used, the
     * same have to be used for all requests in session (check_flights,
     * save_booking, confirm_payment)
     * 
     * Example : e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
     */
    visitor_uniqid?: string;
}