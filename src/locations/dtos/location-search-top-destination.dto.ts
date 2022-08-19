import { SourcePopularity } from "../types";
import { CommonLocationDto } from "./common-location.dto";

export interface LocationSearchTopDestinationsDto extends Pick<CommonLocationDto, "locale" | "limit" | "sort" | "active_only"> {
    /**
     * identifier of the start point - slug or id (airport, station, bus_station, city, subdivision, autonomous_territory, country)
     * More than one is possible.
     *
     * Example : london_gb
     */
    term: string;
    /**
     * based on searches (default), bookings or clicks
     *
     * Example : searches
     */
    source_popularity?: SourcePopularity;
}
