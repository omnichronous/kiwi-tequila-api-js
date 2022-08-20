import { LocationSourcePopularity } from "../types";
import { LocationDto } from "./location.dto";

export interface LocationTopDestinationsHashtagsLookupDto extends Pick<LocationDto, "limit"> {
    /**
     * identifier of the start point - id (airport, station,
     * bus_station, city, subdivision, autonomous_territory,
     * country) More than one is possible.
     *
     * Example : london_gb
     */
    term: string | string[];
    /**
     * based on searches (default), bookings or clicks
     * 
     * Example : searches
     */
    source_popularity?: LocationSourcePopularity;
    /**
     * based on searches, bookings or clicks. Can be left blank.
     * Used if not enough results is returned by source_popularity
     */
    fallback_popularity?: LocationSourcePopularity;
}