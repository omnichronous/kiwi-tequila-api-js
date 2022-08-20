import { LocationDto } from "./location.dto";

export interface LocationSearchByRadiusDto extends LocationDto {
    /**
     * latitude of the centre point of the search. 40.7 is also acceptable.
     */
    lat?: number | string;
    /**
     * longitude of the centre point of the search. -73.9 is also acceptable.
     */
    lon?: number | string;
    /**
     * searched term (for suggestions). This parameter expects a full IATA code.
     * If IATA code is not given, the search will go through other available fields:
     * 'id', 'name' or 'code' of the location. It also depends on the 'location_types'
     * specified eg. airport, city, country. The search that is used behind the scenes
     * is elasticsearch. It returns data based on relevancy and many other factors.
     * 
     * Example : PRG
     */
    term?: string;
    /**
     * the radius defaults to 250 km but can be changed
     */
    radius?: number | string;
}
