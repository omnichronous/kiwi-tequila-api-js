import { LocationDto } from "./location.dto";

export interface LocationSearchByBoxDto extends LocationDto {
    /**
     * latitude of southwest corner of geo box search; 40.2 is also acceptable.
     */
    low_lat: number | string;
    /**
     * longitude of southwest corner of geo box search; -74.6 is also acceptable.
     */
    low_lon: number | string;
    /**
     * latitude of northeast corner of geo box search; 44.7 is also acceptable.
     */
    high_lat: number | string;
    /**
     * longitude of northeast corner of geo box search; -73.3 is also acceptable.
     */
    high_lon: number | string;
}
