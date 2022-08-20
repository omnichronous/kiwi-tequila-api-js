import { LocationDto } from "./location.dto";

export interface LocationGetDumpDto extends LocationDto {
    /**
     * To get more locations than is set limit for locations API use this parameter as follows.
     * For the first request search_after is not required. Once the response to the first request
     * is received, it contains property (list). For the next request (second page), use parameter
     * in form search_after=0qh&search_after=station#0b000000000010000101000010111101.
     *
     * Example : List [ "ᒕ呁ধᐒ妉簄ᰃ峃渄䀀\u0001", "airport0b000000000010001000101111110010" ]
     */
    search_after?: string | string[];
}
