export interface BookingDto {
    /**
     * The token received in the Search API response.
     * Booking tokens expire after 30 minutes.
     * 
     * Example : Aahsdfbbwhdf9BNjhBZVPl2jiXbTu
     */
    booking_token: string;
    /**
     * The session_id binds the pricing to your particular
     * itinerary and can help us track a specific order. Find
     * the session_id in the response of the first check_flights
     * call and use it as a parameter in all subsequent
     * check_flights calls.
     * 
     * Example : d48aecde-df60-496a-9ee6-12fc6a1786e7
     */
    session_id: number;
}
