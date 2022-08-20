import { Currency } from "../types";
import { BookingBaggage, BookingBaggageCombination, BookingFlight } from "../interfaces";
import { BookingResponse } from "./booking.response";

export interface BookingCheckFlightsResponse extends BookingResponse {
    /**
     * binds the pricing to the itinerary and tracks the order
     * available in the response  of the first check_flights call
     * and used as a parameter in all subsequent check_flights calls
     */
    session_id: string;
    flights: BookingFlight[];
    passenger_change: boolean;
    one_passenger: number;
    tickets_price: number;
    /**
     * price breakdown for children	
     * total price for all traveling children, based on “children” param
     * in request
     */
    children_price: number;
    booking_token: string;
    bags_price: Record<number, number>;
    luggage: (null | string | number)[];
    segments: string[];
    currency: Currency;
    conversion: {
        currency: Currency;
        amount: number;
        bags_price: Record<number, number>;
        adults_price: number;
        children_price: number;
        infants_price: number;
    };
    adult_threshold: number;
    /**
     * age threshold of the passenger category 
     * defines the passenger “category” parameter in save_booking
     */
    age_category_thresholds: {
        adult: number;
        child: number;
    };
    insurance_price: {
        travel_basic: number;
        travel_plus: number;
    };
    additional_services: {}; // todo: fill in
    margin_state_id: string;
    baggage: {
        /**
         * defines the baggage type, dimensions, and weight
         */
        definitions: {
            hold_bag: BookingBaggage[];
            hand_bag: BookingBaggage[];
        };
        /**
         * available baggage bundles, including pricing
         * should be referred to in save_booking when ordering baggage
         */
        combinations: {
            hold_bag: BookingBaggageCombination[];
            hand_bag: BookingBaggageCombination[];
        };
        notices: {}; // todo: fill in
    };
    mandatory_ancillaries: boolean;
}
