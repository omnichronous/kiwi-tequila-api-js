import { BookingPassenger, BookingSaveFlight } from "../interfaces";
import { BookingResponse } from "./booking.response";

export interface BookingSaveResponse extends BookingResponse {
    auth_token: string;
    booking_id: number;
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
