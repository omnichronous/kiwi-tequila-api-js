import { formatDate } from "../../utils";

export interface SearchMultiCityDto {
    /**
     * IATA code of the destination
     */
    to: string;
    /**
     * IATA code of origin
     */
    fly_from: string;
    /**
     * search for flights from this date
     */
    dateFrom: string | Date;
    /**
     * search for flights upto this date
     */
    dateTo: string | Date;
}
