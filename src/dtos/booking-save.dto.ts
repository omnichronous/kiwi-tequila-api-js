import { Passenger, Price } from "../interfaces";
import { BaggageCategory, PassengerCategory } from "../types";
import { BookingDto } from "./booking.dto";

export interface BookingSaveParamsDto {
    /**
     * User’s session id, should be unique per user. If used, the same
     * have to be used for all requests in session (check_flights,
     * save_booking, confirm_payment)
     * 
     * Example : e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
     */
    visitor_uniqid?: string;
}

export interface BookingSaveBodyDto extends BookingDto {
    /**
     * The baggage logic is built around definitions and combinations,
     * that allow you to order checked baggage, cabin bag, and personal
     * item (if available in the itinerary). You need to send the
     * respective combination even though you are not ordering any
     * baggage or even if it is included free of charge. You need to
     * include the following object in the baggage array for both a
     * hold_bag (checked bag) option and for a hand_bag (cabin bag) option.
     */
    baggage: {
        /**
         * Requested baggage combination from check_flights response.
         */
        combination: {
            /**
             * Indexes denoting which baggage options from definitions
             * (from the check_flights response) are used in this combination.
             */
            indices: number[];
            category: BaggageCategory;
            conditions: {
                /**
                 * Passenger groups, for which is the combination valid.
                 */
                passenger_groups: PassengerCategory[];
            };
            /**
             * Price breakdown from the check_flights response.
             */
            price: Price;
        },
        /**
         * Indexes of the passengers, for which is this combination valid. You
         * need to specify a hold_bag combination and a hand_bag combination
         * for each passenger.
         */
        passengers: number[];
    }[];
    /**
     * Language, ‘en’ used as default.
     */
    lang: string;
    /**
     * Optional, en-US is used as default.
     */
    locale: string;
    /**
     * List of passengers with their details.
     */
    passengers: Passenger[];
}
