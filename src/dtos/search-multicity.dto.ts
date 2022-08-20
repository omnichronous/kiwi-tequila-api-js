export interface SearchMultiCityDto {
    requests: SearchMultiCityDtoRequest[];
}

export interface SearchMultiCityDtoRequest {
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
