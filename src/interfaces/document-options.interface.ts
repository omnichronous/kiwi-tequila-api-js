import { DocumentNeed } from "../enums";

export interface DocumentOptions {
    airport_checkin_price: number;
    /**
     * States the date in iso timestamp format up to which the
     * check-in is open.
     */
    checkin_date: number | string | Date;
    /**
     * * States if there is a travel document required for the
     *   flight. The value can be set to 0/1/2
     * * The document can be either a passport or an ID, it is a
     *   responsibility of the passenger to choose the right ID
     *   with which they will be able to travel.
     * * document_need 0 - No need to document details at all.
     * * document_need 1 - In case of B2B cooperation, we need document
     *   details at the time of booking, otherwise we do not need
     *   document details right now but they will be requested later
     *   (in standard flow, after booking confirmation, we are sending
     *   email with link to our Manage My Booking section on Kiwi.com
     *   where customer fills passport details).
     * * document_need 2 - Document details have to be provided in
     *   save_booking request. Indicate IDs without expiration date as
     *   null in expiration.
     */
    document_need: DocumentNeed;
}
