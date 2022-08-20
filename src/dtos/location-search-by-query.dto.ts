import { LocationDto } from "./location.dto";

export interface LocationSearchByQueryDto extends LocationDto {
    /**
     * searched term (for suggestions). This parameter expects a full IATA code.
     * If IATA code is not given, the search will go through other available
     * fields: 'id', 'name' or 'code' of the location. It also depends on the
     * 'location_types' specified eg. airport, city, country. The search that
     * is used behind the scenes is elasticsearch. It returns data based on relevancy
     * and many other factors.
     * 
     * Example : PRG
     */
    term: string;
}
