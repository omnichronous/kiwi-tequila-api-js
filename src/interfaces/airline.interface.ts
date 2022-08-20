export interface BookingAirline extends Airline {
    code: string;
    iata_code: string;
    icao_code: string;
    code_public: string;
    alliance: null; // unknown
    virtual_card_req: boolean;
    country: string;
    parent_carrier: string;
    allowed_booking_window: null; // unknown
    deprecated: boolean;
    book_fee: number;
    fee_airline: number;
    search_priority: number;
    fee_instead: number;
    fee_percent: number;
    flight_change_fee: number;
    fee_reason: string;
    threshold_child: number;
    threshold_teen: number;
    threshold_adult: number;
    fees_per_source: {}; // unknown
    is_passenger_cardholder: null; // unknown
    is_private_fares_allowed: null; // unknown
    luggage_only_during_checkin_airlines: null; // unknown
    luggage_only_on_web: null; // unknown
    mmb_link: string;
    skip_subairline_merge: null; // unknown
    hide_name: boolean;
}

export interface OperatingAirline extends Pick<BookingAirline, "iata" | "name" | "hide_name"> {
    public_code: string;
}

export interface Airline {
    id: number;
    name: string;
    url: string;
    Name: string;
    iata: string;
    iatacode: string;
    lcc: number;
    active: number;
    non_active_reason: string;
    affil_url: string;
    airport_checkin: number;
    booking_doc_needed: number;
    carrier_type: string;
    checkin: number;
    checkin_closure: number;
    close_booking_hours: number;
    /**
     * states if Kiwi.com provides online check-in.
     * * 0: no (passenger must check in at the airport).
     * * 1: yes
     */
    doing_online_checkin: 0 | 1;
    grade: string;
    maximum_passengers: number;
    passengers_in_search: number;
    payment_card_copy_eticket_requirement: boolean;
    shorter_stopovers_allowed: number;
    temporary_disabled: string;

    hand_length?: number;
    hand_width?: number;
    hand_height?: number;
    hand_weight?: number;
    hold_weight?: number;
    hold_length?: number;
    hold_width?: number;
    hold_height?: number;
    hand2_length?: number;
    hand2_width?: number;
    hand2_height?: number;
    hand2_weight?: number;
    hand2_note?: string;
    hand_note?: string;
    hold_note?: string;
}
