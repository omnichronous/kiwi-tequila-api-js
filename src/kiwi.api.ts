import axios, { AxiosRequestConfig } from "axios";
import { KiwiOptions } from "./config";
import { SearchDto, serializeSearchDto } from "./dtos";
import { LocationsApi } from "./locations/locations.api";
import { buildConfig, buildUrl, mergeConfig } from "./utils";


export class KiwiApi {
    locations: LocationsApi;
    private config: AxiosRequestConfig;
    constructor(options: KiwiOptions) {
        const baseConfig = buildConfig(options);
        this.config = mergeConfig(baseConfig, "v2");
        this.locations = new LocationsApi(baseConfig);
    }

    /**
     * A single flights search. Please note, that only active
     * parameters have been described in this document. Parameters
     * that are not described are deprecated.
     * 
     * @param params 
     */
    async search(params: SearchDto): Promise<any> {
        params = serializeSearchDto(params);
        
        const { data } = await axios.get(buildUrl("search", params), this.config);

        return data;
    }
}

