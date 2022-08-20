import { AxiosRequestConfig } from "axios";
import { KiwiOptions } from "./config";
import { LocationsApi } from "./locations/locations.api";
import { SearchApi } from "./search";
import { buildConfig, mergeConfig } from "./utils";


export class KiwiApi {
    locations: LocationsApi;
    search: SearchApi;
    private config: AxiosRequestConfig;
    constructor(options: KiwiOptions) {
        const baseConfig = buildConfig(options);
        this.locations = new LocationsApi(baseConfig);

        this.config = mergeConfig(baseConfig, "v2");
        this.search = new SearchApi(this.config);
    }
}

