import axios, { AxiosRequestConfig } from "axios";
import { buildUrl, mergeConfig } from "../utils";
import { LocationGetByAnythingDto, LocationGetByIdDto, LocationGetBySubentityDto, LocationGetDumpDto, LocationSearchByBoxDto, LocationSearchByHashtagDto, LocationSearchByQueryDto, LocationSearchByRadiusDto, LocationSearchBySeoUrlDto, LocationSearchTopDestinationsDto, LocationTopDestinationsHashtagsLookupDto } from "../dtos";
import { LocationsDumpResponse, LocationsHashtagsResponse, LocationsResponse } from "../responses";

export class LocationsApi {
    private config: AxiosRequestConfig;
    constructor(baseConfig: AxiosRequestConfig) {
        this.config = mergeConfig(baseConfig, "locations");
    }

    /**
     * Search by query
     * 
     * Type of request used mainly for suggestions (based on incomplete names)
     * @param params 
     * @returns 
     */
    async searchByQuery(params: LocationSearchByQueryDto): Promise<LocationsResponse> {
        const { data } = await axios.get<LocationsResponse>(buildUrl("query", params), this.config);

        return data;
    }

    /**
     * Search by radius
     * 
     * This type of request supports either specification of location by coordinates (lat, lon)
     * or by identifier (slug or id of location - term)
     * @param params 
     * @returns 
     */
    async searchByRadius(params: LocationSearchByRadiusDto): Promise<LocationsResponse> {
        const { data } = await axios.get<LocationsResponse>(buildUrl("radius", params), this.config);

        return data;
    }

    /**
     * Search by box
     * 
     * Get all locations within the specified box.
     * @param params 
     * @returns 
     */
    async searchByBox(params: LocationSearchByBoxDto): Promise<LocationsResponse> {
        const { data } = await axios.get<LocationsResponse>(buildUrl("box", params), this.config);

        return data;
    }

    /**
     * Search by subentity
     * 
     * Get all locations that are below (in hierarchy) the one specified by id - e.g. for
     * ?type=subentity&term=london_gb all locations in London are returned (as London is city,
     * airports, stations and bus_stations are returned).
     * @param params 
     * @returns 
     */
    async getBySubentity(params: LocationGetBySubentityDto): Promise<LocationsResponse> {
        const { data } = await axios.get<LocationsResponse>(buildUrl("subentity", params), this.config);

        return data;
    }

    /**
     * Get by id
     * 
     * Get location specified by its id.
     * @param params 
     * @returns 
     */
    async getById(params: LocationGetByIdDto): Promise<LocationsResponse> {
        const { data } = await axios.get<LocationsResponse>(buildUrl("id", params), this.config);

        return data;
    }

    /**
     * Get by anything
     * 
     * Get locations specified by any of the following fields for example - id, int_id, code, icao, name, slug, etc.
     * @param params 
     * @returns 
     */
    async getByAnything(params: LocationGetByAnythingDto): Promise<LocationsResponse> {
        const { data } = await axios.get<LocationsResponse>(buildUrl("anything", params), this.config);

        return data;
    }

    /**
     * Get dump
     * 
     * Get dump of locations data in specified language. When retrieving large amounts of locations (using type=dump),
     * it is more efficient to use paginated response. This can be done using parameter search_after. In addition,
     * when retrieving paginated data it is advised to use "sort=id", so the returned results are consistent.
     * @param params 
     * @returns 
     */
    async getDump(params: LocationGetDumpDto): Promise<LocationsDumpResponse> {
        const { data } = await axios.get<LocationsDumpResponse>(buildUrl("dump", params), this.config);

        return data;
    }

    /**
     * Search top destinations
     * 
     * This type of request returns a list of destinations most searched / clicked on / booked from the starting point
     * term. The limit is used to limit the range of results.
     * @param params 
     * @returns 
     */
    async searchTopDestinations(params: LocationSearchTopDestinationsDto): Promise<LocationsResponse> {
        const { data } = await axios.get<LocationsResponse>(buildUrl("tophashtags", params), this.config);

        return data;
    }

    /**
     * Search by hashtags
     * 
     * This type of request returns a list of destinations most searched / clicked on / booked from the starting point term.
     * The limit is used to limit the range of results.
     * @param params 
     * @returns 
     */
    async searchByHashtags(params: LocationSearchByHashtagDto): Promise<LocationsResponse> {
        const { data } = await axios.get<LocationsResponse>(buildUrl("hashtag", params), this.config);

        return data;
    }

    /**
     * Top destinations' hashtags lookup
     * 
     * This type of request returns a list of destinations' hashtags most searched / clicked on / booked from the starting
     * point term. In other words it can be understood as following: What are the most popular activies at the places that
     * customers tend to search for / click / book when flying from term ? The limit is used to limit the range of results.
     * 
     * @param params 
     * @returns 
     */
    async topDestinationsHashtagsLookup(params: LocationTopDestinationsHashtagsLookupDto): Promise<LocationsHashtagsResponse> {
        const { data } = await axios.get<LocationsHashtagsResponse>(buildUrl("tophashtags", params), this.config);

        return data;
    }

    /**
     * Search by seo url
     * 
     * @param params 
     * @returns 
     */
    async searchBySeoUrl(params: LocationSearchBySeoUrlDto): Promise<LocationsResponse> {
        const { data } = await axios.get<LocationsResponse>(buildUrl("slug", params), this.config);

        return data;
    }
}
