import { CommonLocationDto } from "./common-location.dto";

export interface LocationSearchByHashtagDto extends Pick<CommonLocationDto, "locale" | "limit" | "sort" | "active_only"> {
    /**
     * hashtag that the returned location have to be tagged with.
     *
     * Example : beach
     */
    hashtag: string;
    /**
     * identifier of the location the returned locations should be part of
     * - id (airport, station, bus_station, city, subdivision, autonomous_territory,
     * country).
     *
     * Example : FR
     */
    term?: string;

    /**
     * the month in which the hashtag should be valid. Multiple values are allowed.
     *
     * Example : 1
     */
    month?: number | number[];

}