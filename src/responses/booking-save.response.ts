import { BookingPassenger, BookingSaveFlight } from "../interfaces";
import { BookingResponse } from "./booking.response";

export interface BookingSaveResponse extends BookingResponse {
    auth_token: string;
    /**
     * a specific number of the order
     * also referred to as "BID", not equal to PNR
     */
    booking_id: number;
    /**
     * a specific transaction string sequence tied to the BID
     * needs to be used in confirm_payment
     */
    transaction_id: string;
    flights: BookingSaveFlight[];
    /**
     * List of passengers with their details.
     */
    passengers: BookingPassenger[];
    payment_card_copy_eticket_requirement: boolean;
    promocode: {
        discount: number;
        used: false;
    };
    sandbox: boolean;
    status: string;
    status_code: number;
}
