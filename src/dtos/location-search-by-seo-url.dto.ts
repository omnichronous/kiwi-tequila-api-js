import { LocationDto } from "./location.dto";

export interface LocationSearchBySeoUrlDto extends Pick<LocationDto, "locale" | "active_only"> {
    /**
     * this field expects the exact slug code of the airport, station, bus_station, city, autonomous_territory, subdivision, country, region, continent.
     *
     * Example : albany-new-york-united-states
     */
    term: string;
}
