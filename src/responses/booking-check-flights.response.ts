import { Currency } from "../types";
import { BookingBaggage, BookingBaggageCombination, BookingFlight } from "../interfaces";
import { BookingResponse } from "./booking.response";

export interface BookingCheckFlightsResponse extends BookingResponse {
    session_id: string;
    flights: BookingFlight[];
    passenger_change: boolean;
    one_passenger: number;
    tickets_price: number;
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
        definitions: {
            hold_bag: BookingBaggage[];
            hand_bag: BookingBaggage[];
        };
        combinations: {
            hold_bag: BookingBaggageCombination[];
            hand_bag: BookingBaggageCombination[];
        };
        notices: {}; // todo: fill in
    };
    mandatory_ancillaries: boolean;
}
