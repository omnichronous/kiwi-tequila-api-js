import { VehicleType } from "../types";

export interface SearchFlight {
    /**
     * flight ID
     */
    id: string;
    combination_id: number;
    /**
     * the airline code
     */
    airline: string;
    /**
     * true - bags need to be rechecked, false - no need to recheck bags
     */
    bags_recheck_required: boolean;
    vi_connection: boolean;
    /**
     * departure city name
     */
    cityFrom: string;
    cityCodeFrom: string;
    /**
     * destination city name
     */
    cityTo: string;
    cityCodeTo: string;
    /**
     * Type of aircraft example - 32A (airbus A320), functionality is
     * still in beta form and it may be empty when we do not have this
     * information
     */
    equipment: string;
    /**
     * (often just referred to as a fare basis) an alphabetic or
     * alpha-numeric code used by airlines to identify a fare type and
     * allow airline staff and travel agents to find the rules applicable
     * to that fare
     */
    fare_basis: string;
    fare_category: string;
    /**
     * information about the particular class, we will be providing
     * higher classes in future
     */
    fare_classes: string;
    /**
     * group of fares that airlines use to market different travel options
     * associated with an airfare, such as non-refundable, flexible, etc.
     */
    fare_family: string;
    /**
     * the flight number
     */
    flight_no: number;
    /**
     * IATA code of the origin airport
     */
    flyFrom: string;
    /**
     * IATA code of the destination airport
     */
    flyTo: string;
    guarantee: boolean;
    last_seen: string;
    /**
     * time of arrival in iso timestamp
     */
    local_arrival: Date | string;
    /**
     * time of departure in iso timestamp
     */
    local_departure: Date | string;
    operating_carrier: string;
    operating_flight_no: string;
    /**
     * time fo last refresh in iso timestamp
     */
    refresh_timestamp: string;
    /**
     * return flight flag. 0 for no, 1 for yes
     */
    return: 0 | 1;
    /**
     * time of arrival in utc format
     */
    utc_arrival: Date | string;
    /**
     * time of departure in utc format
     */
    utc_departure: Date | string;
    vehicle_type: VehicleType;
}
