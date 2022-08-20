export enum DocumentNeed {
    /**
     * No need to document details at all.
     */
    NONE = 0,
    /**
     * In case of B2B cooperation, we need document
     * details at the time of booking, otherwise we
     * do not need document details right now but they
     * will be requested later (in standard flow,
     * after booking confirmation, we are sending email
     * with link to our Manage My Booking section on Kiwi.com
     * where customer fills passport details).
     */
    REQUESTED_LATER = 1,
    /**
     * Document details have to be provided in
     * save_booking request. Indicate IDs without
     * expiration date as null in expiration.
     */
    REQUIRED = 2,
}
