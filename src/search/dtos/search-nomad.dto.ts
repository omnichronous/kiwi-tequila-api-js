import { NumericBoolean } from "../../types";
import { FlyLocations } from "../types";
import { SearchSingleCityDto } from "./search-singlecity.dto";

export interface SearchNomadParamsDto extends Pick<SearchSingleCityDto, 
                                                "date_from" | "date_to" | "return_from" |
                                                "return_to" | "select_airlines" | "select_airlines_exclude" |
                                                "fly_from" | "fly_to" | "conn_on_diff_airport" |
                                                "max_stopovers" |"adults" | "children" | "infants" | 
                                                "curr" | "locale" | "partner_market" | 
                                                "sort" | "asc" | "limit"> {
    /**
     * language - if language is added to locale, then everything remains the
     * same, only the language changes.
     * 
     * Example :
     */
    lang?: string;
    /**
     * returns an xml response instead of json
     * 
     * Example :
     */
    xml?: NumericBoolean;
    /**
     * the minimal length of stay in the destination. Counts nights, not days.
     * 
     * Example :
     */
    nights_on_trip_from?: number;
    /**
     * the max length of stay in the destination (use only one from the
     * nights_on_trip_from / nights_on_trip_to and return_from / return_to
     * parameters. If both of them are given, the API uses the nights_on_trip
     * parameters and the return dates are ignored). When you omit one of
     * these two params, the default value for nights_on_trip_from is 1 and
     * for nights_on_trip_to is 14.
     * 
     * Example :
     */
    nights_on_trip_to?: number;
}

export interface SearchNomadBodyDto {
    via: SearchNomadBodyDtoVia[];
}

export interface SearchNomadBodyDtoVia {
    locations: FlyLocations;
    nights_range: [number, number];
    date_range: [string | Date, string | Date];
}
