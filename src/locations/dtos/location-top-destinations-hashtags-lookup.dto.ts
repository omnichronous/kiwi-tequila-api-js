import { SourcePopularity } from "../types";

export interface LocationTopDestinationsHashtagsLookupDto {
    /**
     * identifier of the start point - id (airport, station,
     * bus_station, city, subdivision, autonomous_territory,
     * country) More than one is possible.
     *
     * Example : london_gb
     */
    term: string | string[];
    /**
     * default value = 100. Desired number of results in the output.
     *
     * Example : 100
     */
    limit?: number;
    /**
     * based on searches (default), bookings or clicks
     * 
     * Example : searches
     */
    source_popularity?: SourcePopularity;
    /**
     * based on searches, bookings or clicks. Can be left blank.
     * Used if not enough results is returned by source_popularity
     */
    fallback_popularity?: SourcePopularity;
}