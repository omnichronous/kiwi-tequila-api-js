import axios, { AxiosRequestConfig } from "axios";
import { buildUrl, formatDate, serializeNumericBoolean, serializeStrArray } from "../utils";
import { SearchMultiCityDto, SearchSingleCityDto } from "./dtos";
import { SearchMultiCityResponse, SearchSingleCityResponse } from "./responses";
import { Currency, SearchLocale } from "./types";
import { serializeFlyLocations, serializeHandBags, serializeHoldBags } from "./utils";

export class SearchApi {
    private config: AxiosRequestConfig;
    constructor(config: AxiosRequestConfig) {
        this.config = config;
    }

    /**
     * A single flights search. Please note, that only active
     * parameters have been described in this document. Parameters
     * that are not described are deprecated.
     * 
     * @param params 
     */
    async singlecity(dto: SearchSingleCityDto): Promise<SearchSingleCityResponse> {
        if (dto.fly_from) dto.fly_from = serializeFlyLocations(dto.fly_from);
        if (dto.fly_to) dto.fly_to = serializeFlyLocations(dto.fly_to);
    
        if (dto.adult_hold_bag) dto.adult_hold_bag = serializeHoldBags(dto.adult_hold_bag);
        if (dto.adult_hand_bag) dto.adult_hand_bag = serializeHandBags(dto.adult_hand_bag);
        if (dto.child_hold_bag) dto.child_hold_bag = serializeHoldBags(dto.child_hold_bag);
        if (dto.child_hand_bag) dto.child_hand_bag = serializeHandBags(dto.child_hand_bag);
        if (typeof dto.conn_on_diff_airport === "boolean") dto.conn_on_diff_airport = serializeNumericBoolean(dto.conn_on_diff_airport);
        if (typeof dto.ret_from_diff_airport === "boolean") dto.ret_from_diff_airport = serializeNumericBoolean(dto.ret_from_diff_airport);
        if (typeof dto.ret_to_diff_airport === "boolean") dto.ret_to_diff_airport = serializeNumericBoolean(dto.ret_to_diff_airport);
        if (dto.select_airlines) dto.select_airlines = serializeStrArray(dto.select_airlines);
        if (dto.select_stop_airport) dto.select_stop_airport = serializeStrArray(dto.select_stop_airport);
        if (typeof dto.asc === "boolean") dto.asc = serializeNumericBoolean(dto.asc);
            
        const { data } = await axios.get<SearchSingleCityResponse>(buildUrl("search", dto), this.config);

        data.data?.forEach((v, i) => {
            formatDates(v);
            
            if (Array.isArray(v.route)) {
                v.route.forEach(r => {
                    formatDates(r);
                });
            }
        });

        return data;
    }

    /**
     * This call is able to do multi-city searches in parallel. The single
     * search queries don't have to be connected in any way.
     * * It accepts the same parameters as the /search API call. These parameters
     * are to be used in the body of the request not in the URL.
     * * To do a request, send a POST json payload with a list of API parameters
     * for each search query.
     * * The maximum number of segments in each request is 9 (If a higher number
     * of routes is requested in /flights_multi POST method, all that they receive
     * is an empty result - []).
     * * In the response root, the results field contains a list of responses for
     * the posted queries. Every single element contains the same response as it
     * would if /search API call were used.
     * @param body 
     * @param params 
     * @returns 
     */
    async multicity(dto: SearchMultiCityDto, params?: {
        locale?: SearchLocale,
        curr?: Currency,
    }): Promise<SearchMultiCityResponse> {
        dto.requests.forEach(v => {
            if (v.dateFrom instanceof Date) v.dateFrom = formatDate(v.dateFrom);
            if (v.dateTo instanceof Date) v.dateTo = formatDate(v.dateTo);
        });

        const { data } = await axios.post<SearchMultiCityResponse>(buildUrl("multicity", params), dto, this.config);

        data.route?.forEach(v => {
            formatDates(v);
            
            if (Array.isArray(v.route)) {
                v.route.forEach(r => {
                    formatDates(r);
                });
            }
        });

        return data;
    }
}

function formatDates(obj: {
    local_arrival?: Date | string;
    local_departure?: Date | string;
    utc_arrival?: Date | string;
    utc_departure?: Date | string;
}) {
    if (typeof obj.local_arrival === "string") obj.local_arrival = new Date(obj.local_arrival);
    if (typeof obj.local_departure === "string") obj.local_departure = new Date(obj.local_departure);
    if (typeof obj.utc_arrival === "string") obj.utc_arrival = new Date(obj.utc_arrival);
    if (typeof obj.utc_departure === "string") obj.utc_departure = new Date(obj.utc_departure);
}