import { HandBag, HoldBag, PassengerCategory } from "../types";

export interface Passenger {
    /**
     * Date in YYYY-MM-DD format
     */
    birthday: string | Date;
    /**
     * An alphanumeric string that represents a number of a travel document
     * (ID or passport) with a maximum length of twenty characters, you can
     * check if it is required in response from check_flights in parameter
     * document_need.
     */
    cardno: string;
    /**
     * 
     */
    category: PassengerCategory;
    /**
     * Use the email address connected to your deposit account in Tequila.
     */
    email: string;
    /**
     * Expiration of the travel document in YYYY-MM-DD format'
     */
    expiration: string | Date;
    /**
     * First name (and middle name of a passenger), if you need to add
     * middle name please send it in this parameter in
     * format = “first_name|middle_name”.
     */
    name: string;
    /**
     * The nationality of the passenger which has to be in ISO 3166-1
     * alpha-2 format (not a country issuing the travel document)
     */
    nationality: string;
    /**
     * Use your company or dummy number (not passenger’s). Phone number
     * is validated as per following regexp: ^+[1-9][0-9]{7,14}$
     */
    phone: string;
    /**
     * Last name
     */
    surname: string;
    title: "Mr" | "Ms"
}

export interface BookingPassenger extends Omit<Passenger, "phone" | "email"> {
    pk: number;
    bid: string;
    checkin: string | Date;
    hand_bags: HandBag;
    hold_bags: HoldBag;
    insurance_price: number;
    insurance_sent: number;
    insurance_type: string;
    issuer: string;
    visa: number;
    created_at: string | Date;
    updated_at: string | Date;
}
