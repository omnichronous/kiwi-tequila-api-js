import { NumericBoolean } from "../../types";
import { Cabin, Days } from "../enums";
import { FlyLocation, Radius } from "../interfaces";
import { Currency, FlyDaysType, FlyLocations, HandBags, HoldBags, SearchLocale, VehicleType } from "../types";

export interface SearchSingleCityDto {
    /**
     * Kiwi API ID of the departure location. It accepts multiple
     * values separated by a comma, these values might be airport
     * codes, city IDs, two letter country codes, metropolitan codes
     * and radiuses as well as a subdivision, region, autonomous_territory,
     * continent and specials (Points of interest, such as Times Square).
     * 
     * Some locations have the same code for airport and metropolis (city),
     * e.g. DUS stands for metro code Duesseldorf, Moenchengladbach and
     * Weeze as well as Duesseldorf airport. See the following examples:
     * 
     * * 'fly_from=city:DUS' will match all airports in "DUS", "MGL" and
     * "NRN" (all in the city of Duesseldorf)
     * * 'fly_from=DUSf will do the same as the above
     * * 'fly_from=airport:DUS' will only match airport "DUS"
     * 
     * Radius needs to be in form lat-lon-xkm. The number of decimal places
     * for radius is limited to 6. E.g.-23.24--47.86-500km for places around
     * Sao Paulo. 'LON' - checks every airport in London, 'LHR' - checks
     * flights from London Heathrow, 'UK' - flights from the United Kingdom.
     * 
     * Link to Locations API.
     * 
     * Example : FRA
     */
    fly_from: FlyLocations;
    /**
     * Kiwi api ID of the arrival destination. It accepts the same values in
     * the same format as the 'fly_from' parameter
     * 
     * If you don’t include any value you’ll get aggregated results for some
     * airports.
     * 
     * Example : PRG
     */
    fly_to?: FlyLocations;
    /**
     * search flights from this date (dd/mm/yyyy). Use parameters date_from
     * and date_to as a date range for the flight departure.
     * 
     * Parameters 'date_from=01/04/2021' and 'date_to=01/04/2021' mean that
     * the departure can be anytime between the specified dates.
     * 
     * For the dates of the return flights, use the 'return_to' and
     * 'return_from' or 'nights_in_dst_from' and 'nights_in_dst_to' parameters.
     * 
     * Example : 01/04/2021
     */
    date_from: Date;
    /**
     * search flights upto this date (dd/mm/yyyy)
     * 
     * Example : 05/04/2021
     */
    date_to: Date;
    /**
     * min return date of the whole trip (dd/mm/yyyy)
     * 
     * Example : 03/04/2021
     */
    return_from?: Date;
    /**
     * max return date of the whole trip (dd/mm/yyyy)
     * 
     * Example : 04/04/2021
     */
    return_to?: Date;
    /**
     * the minimal length of stay in the destination given in the
     * fly_to parameter.
     * 
     * Example : 2
     */
    nights_in_dst_from?: number;
    /**
     * the maximal length of stay in the destination given in the
     * fly_to parameter.
     * 
     * *Either both parameters 'nights_in_dst_to' and
     * 'nights_in_dst_from' have to be specified or none of them.*
     * 
     * Example : 3
     */
    nights_in_dst_to?: number;
    /**
     * max flight duration in hours, min value 0
     * 
     * Example : 20
     */
    max_fly_duration?: number;
    /**
     * switch for oneway/round flights search - will be deprecated
     * in the near future (until then, you have to use the round parameter
     * if one from the nights_in_dst of return date parameters is given.)
     * 
     * Available values : round, oneway
     * 
     * Example : round
     */
    flight_type?: "round" | "oneway";
    /**
     * It returns the cheapest flights to every city covered by the to
     * parameter. E.g. if you set it to 1 and your search is from PRG to
     * LON/BUD/NYC, you'll get 3 results: the cheapest PRG-LON, the cheapest
     * PRG-BUD, and the cheapest PRG-NYC. one_for_city and one_per_date query
     * parameters work only on one-way requests. In case you want to create
     * Return Trip itinerary calendar, you need to request Outbound and Inbound
     * segments separately.
     * 
     * Example : 0
     */
    one_for_city?: number;
    /**
     * returns the cheapest flights for one date. Can be 0 or not included, or
     * one of these two params can be set to 1. one_for_city and one_per_date
     * query parameters work only on one-way requests. In case you want to create
     * Return Trip itinerary calendar, you need to request Outbound and Inbound
     * segments separately.
     * 
     * Example : 0
     */
    one_per_date?: number;
    /**
     * Used to specify the number of adults. Please note, that children are
     * considered adults in our search engine. The default passengers' value is 1.
     * The sum of adults, children and infants cannot be greater than 9.
     * 
     * Example : 2
     */
    adults?: number;
    /**
     * It specifies the number of children. The default value is 0. The sum of adults,
     * children and the infants cannot be greater than 9. At the moment, children are
     * considered as adults in most of the provided content. Whenever we have the child
     * fare available for some content it will be visible in the response.
     * 
     * Example : 2
     */
    children?: number;
    /**
     * Parameter used to specify the number of infants. The default value is 0. The sum
     * of adults, children and infants cannot be greater than 9.
     * 
     * Example : 2
     */
    infants?: number;
    /**
     * Specifies the preferred cabin class. Cabins can be: M (economy), W (economy premium),
     * C (business), or F (first class). There can be only one selected cabin for one call.
     * 
     * Example : C
     */
    selected_cabins?: Cabin;
    /**
     * Allows the client to combine different cabin classes in their request. The response
     * can then contain the same itineraries (flights) with different pricing based on the
     * cabin class. If mix_with_cabins is not set, only selected_cabins is used. Itineraries
     * consisting of more than one cabin class follow this rules:
     * 
     * * The total time spent in higher class segments (GDS) of a single sector is at least 50%
     * of the total sector's traveling time.
     * * Any segment with traveling time longer than four hours (long-haul) is with the higher
     * cabin class.
     * 
     * Please call the API only with the desired cabin classes and note that the mix_with_cabins
     * class must be lower than the selected_cabins class.
     * 
     * Example : M
     */
    mix_with_cabins?: Cabin;
    /**
     * Number of adult hold bags separated by commas. The first number represents the number of
     * bags for passenger 1, the second number is for passenger 2, etc. Can only contain up to
     * two hold bags per passenger.
     * 
     * Example : 1,0
     */
    adult_hold_bag?: HoldBags;
    /**
     * Number of adult hand bags separated by commas. The first number represents the number of
     * bags for passenger 1, the second number is for passenger 2 etc. Can only contain up to
     * one hand bag per passenger.
     * 
     * Example : 1,1
     */
    adult_hand_bag?: HandBags;
    /**
     * Number of child hold bags separated by commas. The first number represents the number of
     * bags for passenger 1, the second number is for passenger 2 etc. Can only contain up to
     * two hold bags per passenger.
     * 
     * Example : 2,1
     */
    child_hold_bag?: HoldBags;
    /**
     * Number of child hand bags separated by commas. The first number represents the number of
     * bags for passenger 1, the second number is for passenger 2 etc. Can only contain up to
     * one hand bag per passenger.
     * 
     * Example : 1,1
     */
    child_hand_bag?: HandBags;
    /**
     * he list of week days for the flight, where 0 is Sunday, 1 is Monday, etc.
     * 
     * URL encoded format for all days : '&fly_days=0&fly_days=1&fly_days=2&...&fly_days=6'
     * 
     * Example :
     */
    fly_days?: Days | Days[];
    /**
     * type of set fly_days; It is used to specify whether the flight is an arrival or a departure.
     * 
     * Available values : departure, arrival
     * 
     * Example :
     */
    fly_days_type?: FlyDaysType;
    /**
     * the list of week days for the flight, where 0 is Sunday, 1 is Monday, etc.
     * 
     * URL encoded format for all days: '&ret_fly_days=0&ret_fly_days=1&ret_fly_days=2&...&ret_fly_days=6'
     * 
     * Example :
     */
    ret_fly_days?: Days | Days[];
    /**
     * type of set ret_fly_days; It is used to specify whether the flight is an arrival or a departure.
     * 
     * Available values : departure, arrival
     * 
     * Example :
     */
    ret_fly_days_type?: FlyDaysType;
    /**
     * search flights with departure only on working days.
     * 
     * Example : false
     */
    only_working_days?: boolean;
    /**
     * search flights with departure only on weekends.
     * 
     * Example : false
     */
    only_weekends?: boolean;
    /**
     * The market of a particular country from which the request originates. Use ISO 3166-1
     * alpha-2 to fill in the value.
     * 
     * Example : us
     */
    partner_market?: string;
    /**
     * use this parameter to change the currency in the response
     * 
     * Available values : AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM, BBD, BDT, BGN,
     * BHD, BIF, BMD, BND, BOB, BRL, BSD, BTC, BTN, BWP, BYN, BZD, CAD, CDF, CHF, CLF, CLP, CNY,
     * COP, CRC, CUC, CUP, CVE, CZK, DJF, DKK, DOP, DZD, EEK, EGP, ERN, ETB, EUR, FJD, FKP, GBP,
     * GEL, GGP, GHS, GIP, GMD, GNF, GTQ, GYD, HKD, HNL, HRK, HTG, HUF, IDR, ILS, IMP, INR, IQD,
     * IRR, ISK, JEP, JMD, JOD, JPY, KES, KGS, KHR, KMF, KPW, KRW, KWD, KYD, KZT, LAK, LBP, LKR,
     * LRD, LSL, LTL, LVL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP, MRO, MTL, MUR, MVR, MWK, MXN,
     * MYR, MZN, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB, PEN, PGK, PHP, PKR, PLN, PYG, QAR, QUN,
     * RON, RSD, RUB, RWF, SAR, SBD, SCR, SDG, SEK, SGD, SHP, SLL, SOS, SRD, STD, SVC, SYP, SZL,
     * THB, TJS, TMT, TND, TOP, TRY, TTD, TWD, TZS, UAH, UGX, USD, UYU, UZS, VEF, VND, VUV, WST,
     * XAF, XCD, XOF, XPF, YER, ZAR, ZMK, ZMW, ZWL
     */
    curr?: Currency;
    /**
     * the language of city names in the response and also language of kiwi.com website to which
     * deep_links lead
     * 
     * Available values : ae, ag, ar, at, au, be, bg, bh, br, by, ca, ca-fr, ch, cl, cn, co, ct,
     * cz, da, de, dk, ec, ee, el, en, es, fi, fr, gb, gr, hk, hr, hu, id, ie, il, in, is, it, ja,
     * jo, jp, ko, kr, kw, kz, lt, mx, my, nl, no, nz, om, pe, ph, pl, pt, qa, ro, rs, ru, sa, se,
     * sg, sk, sr, sv, th, tr, tw, ua, uk, us, vn, za
     * 
     * Example :
     */
    locale?: SearchLocale;
    /**
     * result filter, minimal price
     * 
     * Example :
     */
    price_from?: number;
    /**
     * result filter, maximal price
     * 
     * Example :
     */
    price_to?: number;
    /**
     * result filter, min. departure time (11:00 means 11AM, 23:00 means 11PM).
     * 
     * Example :
     */
    dtime_from?: string;
    /**
     * result filter, max departure time (11:00 means 11AM, 23:00 means 11PM).
     * 
     * Example :
     */
    dtime_to?: string;
    /**
     * result filter, min arrival time (11:00 means 11AM, 23:00 means 11PM).
     * 
     * Example :
     */
    atime_from?: string;
    /**
     * result filter, max arrival time (11:00 means 11AM, 23:00 means 11PM).
     * 
     * Example :
     */
    atime_to?: string;
    /**
     * result filter, min dep. time of the returning flight (11:00 means 11AM, 23:00 means 11PM).
     * 
     * Example :
     */
    ret_dtime_from?: string;
    /**
     * result filter, max dep. time of the returning flight (11:00 means 11AM, 23:00 means 11PM).
     * 
     * Example :
     */
    ret_dtime_to?: string;
    /**
     * result filter, min arrival time of the returning flight (11:00 means 11AM, 23:00 means 11PM).
     * 
     * Example :
     */
    ret_atime_from?: string;
    /**
     * result filter, min arrival time of the returning flight (11:00 means 11AM, 23:00 means 11PM).
     * 
     * Example :
     */
    ret_atime_to?: string;
    /**
     * result filter, min length of stopover, 48:00 means 2 days (48 hours)
     * 
     * Example :
     */
    stopover_from?: string;
    /**
     * result filter, max length of stopover, 48:00 means 2 days (48 hours)
     * 
     * Example :
     */
    stopover_to?: string;
    /**
     * max number of stopovers per itinerary. Use 'max_stopovers=0' for direct flights only.
     * 
     * Example : 2
     */
    max_stopovers?: number;
    /**
     * max number of stopovers per itinerary's sector.
     * 
     * Example : 2
     */
    max_sector_stopovers?: number;
    /**
     * whether or not to search for connections on a different airport, applicable for non-virtually
     * interlined itineraries. It can be set to 0 or 1, 1 is default. Connections on a different airport
     * for virtually interlined trips are disabled in the search setup and can be enabled per request
     * via Tequila Helpdesk.
     * 
     * Example :
     */
    conn_on_diff_airport?: NumericBoolean;
    /**
     * whether or not to search for flights leaving from a different airport than where the customer
     * landed, can be set to 0 or 1, 1 is default
     * 
     * Example :
     */
    ret_from_diff_airport?: NumericBoolean;
    /**
     * whether or not to search for flights returning to a different airport than the one from where
     * the customer departed, can be set to 0 or 1, 1 is default
     * 
     * Example :
     */
    ret_to_diff_airport?: NumericBoolean;
    /**
     * a list of airlines (IATA codes) separated by ',' (commas) that should / should not be included
     * in the search.
     * 
     * The selection or omission of the airline depends on the 'select_airlines_exclude' parameter.
     * 
     * Select a list of airlines and use the 'select_airlines_exclude' parameter to specify whether or
     * not the selected airlines should be excluded/included in the search.
     * 
     * Example :
     */
    select_airlines?: string | string[];
    /**
     * it can be thought of as a switch for the 'selectedAirlines' parameter where 'False=select' and
     * 'True=omit'.
     * 
     * If set to true the search returns combinations without the airlines specified in the parent
     * parameter selectedAirlines.
     * 
     * If set to false the search returns combinations where none of the flights in this combinations
     * is served by any given airline code.
     * 
     * Example :
     */
    select_airlines_exclude?: boolean;
    /**
     * a list of stopover airports (IATA codes) separated by ',' (commas) that should / should not be
     * included.
     * 
     * The selection or omission of the airport depends on the 'select_stop_airport_exclude' parameter.
     * 
     * Select a list of airports and use the 'select_stop_airport_exclude' parameter to specify whether
     * or not the selected airport should be excluded/included in the search.
     * 
     * Example :
     */
    select_stop_airport?: string | string[];
    /**
     * It can be thought of as a switch for the 'select_stop_airport' parameter where 'False=include,select' and 'True=exclude,omit'.
     * 
     * If set to true the search returns combinations where a stopover is through one of the given airports.
     * 
     * If is set to false the search returns combinations where none of stopovers is through any of given airports.
     * 
     * Example :
     */
    select_stop_airport_exclude?: boolean;
    /**
     * this parameter allows you to specify the vehicle type. The options are aircraft (default), bus, train.
     * 
     * Example : aircraft
     */
    vehicle_type?: VehicleType;
    /**
     * sorts the results by quality, price, date or duration. Price is the default value.
     * 
     * Available values : price, duration, quality, date
     * 
     * Example :
     */
    sort?: "price" | "duration" | "quality" | "date";
    /**
     * can be set to 1 or 0, default is 1 - from cheapest flights to the most expensive
     * 
     * Example :
     */
    asc?: NumericBoolean;
    /**
     * limit number of results; the default value is 200; max is up to the partner (500 or 1000)
     * 
     * Example : 500
     */
    limit?: number;
}

export function serializeSearchDto(dto: SearchSingleCityDto) : SearchSingleCityDto {
    if (dto.fly_from) dto.fly_from = serializeFlyLocations(dto.fly_from);
    if (dto.fly_to) dto.fly_to = serializeFlyLocations(dto.fly_to);

    if (dto.adult_hold_bag) dto.adult_hold_bag = serializeHoldBags(dto.adult_hold_bag);
    if (dto.adult_hand_bag) dto.adult_hand_bag = serializeHandBags(dto.adult_hand_bag);
    if (dto.child_hold_bag) dto.child_hold_bag = serializeHoldBags(dto.child_hold_bag);
    if (dto.child_hand_bag) dto.child_hand_bag = serializeHandBags(dto.child_hand_bag);
    if (typeof dto.conn_on_diff_airport === "boolean") dto.conn_on_diff_airport = serializeNumericBoolean(dto.conn_on_diff_airport);
    if (typeof dto.ret_from_diff_airport === "boolean") dto.ret_from_diff_airport = serializeNumericBoolean(dto.ret_from_diff_airport);
    if (typeof dto.ret_to_diff_airport === "boolean") dto.ret_to_diff_airport = serializeNumericBoolean(dto.ret_to_diff_airport);
    if (dto.select_airlines) dto.select_airlines = serializeStrArray(dto.select_airlines);
    if (dto.select_stop_airport) dto.select_stop_airport = serializeStrArray(dto.select_stop_airport);
    if (typeof dto.asc === "boolean") dto.asc = serializeNumericBoolean(dto.asc);

    return dto;
}

function serializeFlyLocations(input: FlyLocations) : string {
    const sep = ",";
    if (Array.isArray(input)) {
        return input.map(serializeFlyLocations).join(sep);
    }

    if (isFlyLocation(input)) {
        const { type, value } = input;

        if (Array.isArray(value)) {
            return value.map(v => `${type}:${v}`).join(sep);
        }

        return `${type}:${value}`;
    }

    if (isRadius(input)) {
        const { lat, lon, xkm } = input;

        return `${lat}-${lon}-${xkm}km`;
    }

    return input;

    function isFlyLocation(obj: unknown): obj is FlyLocation {
        return !!obj &&
            typeof obj === "object" &&
            "type" in obj &&
            "value" in obj;
    }
    
    function isRadius(obj: unknown): obj is Radius {
        return !!obj &&
            typeof obj === "object" &&
            "lat" in obj &&
            "lon" in obj &&
            "xkm" in obj;
    }
}

function serializeNumericBoolean(obj: boolean) : 1 | 0 {
    return obj ? 1 : 0;
}

function serializeHandBags(obj: HandBags) : HandBags {
    if (Array.isArray(obj)) return obj.join(",");

    return obj;
}

function serializeHoldBags(obj: HoldBags) : HoldBags {
    if (Array.isArray(obj)) return obj.join(",");

    return obj;
}

function serializeStrArray(str: string | string[]) : string {
    if (Array.isArray(str)) return str.join(',');
    return str;
}
