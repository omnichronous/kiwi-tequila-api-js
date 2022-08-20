import { LocationDto } from "./location.dto";

export interface LocationGetBySubentityDto extends LocationDto {
    /**
     * this is the exact IATA airport or ISO3166 location code - station,
     * airport, bus_station, city, autonomous_territory, subdivision, country
     * 
     * Example : ZW
     */
    term: string;
}
