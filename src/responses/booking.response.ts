import { DocumentOptions } from "../interfaces";

export interface BookingResponse {
    pnum: number;
    /**
     * price for the itinerary (with baggage)
     * in EUR
     */
    total: number;
    /**
     * price breakdown for adults
     * total price for all traveling adults, based on “adult”
     * param in request
     */
    adults_price: number;
    /**
     * price breakdown for infants
     * total price for all traveling infants, based on “infant”
     * param in request
     */
    infants_price: number;
    book_fee: number;
    credits_price: number;
    route: string[];
    transfers: string[];
    document_options: DocumentOptions;
    visas_agreement_requiered: boolean;
    /**
     * total price for the itinerary in EUR
     */
    eur_payment_price: number;
    extra_fee: number;
    sp_fee: number;
    fee_airline: number;
    flights_price: number;
    flight_real_price: number;
    /**
     * confirms the price and flight bookability
     * 
     * must return “true” to be able to continue to save_booking
     */
    flights_checked: boolean;
    flights_real_checked: boolean;
    flights_to_check: boolean;
    /**
     * This value can be set to True, which means that the flight
     * is not bookable anymore because it was either cancelled by
     * the airline or has sold out already. The booking should be
     * cancelled and save_booking should not be called. This is a
     * rare occasion and it should not happen often.
     */
    flights_invalid: boolean;
    /**
     * If set to True, your new price can be found in the parameter
     * total and price before price change in the parameter
     * original_price. Price change can occur even during save_booking.
     * Price change in save_booking - if the customer accepts the price
     * change, you neither call check_flights nor save_booking again.
     * The parameter "total" changes and you can continue with your booking.
     */
    price_change: boolean;
    max_passengers: 9;
    infants_conditions: {
        trolley: boolean;
        hand_weight: number;
    };
    orig_price: number;
    orig_price_usage: boolean;
    server_time: number;
}
