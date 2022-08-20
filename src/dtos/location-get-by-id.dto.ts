import { LocationDto } from "./location.dto";

export interface LocationGetByIdDto extends Pick<LocationDto, "limit" | "locale" | "active_only"> {
    /**
     * this is the exact IATA airport or ISO3166 location code - station, airport, city,
     * autonomous_territory, subdivision, country, region, continent. Multiple ids can be
     * specified by appending &id={id}.
     * 
     * Example : ZW
     */
    id: string | string[];
}
