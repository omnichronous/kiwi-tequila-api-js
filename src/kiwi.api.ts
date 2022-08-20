import { AxiosRequestConfig } from "axios";
import { BookingApi, SearchApi, LocationsApi } from "./apis";
import { KiwiOptions } from "./config";
import { buildConfig, mergeConfig } from "./utils";


export class KiwiApi {
    locations: LocationsApi;
    search: SearchApi;
    booking: BookingApi;
    private config: AxiosRequestConfig;
    constructor(options: KiwiOptions) {
        const baseConfig = buildConfig(options);
        this.locations = new LocationsApi(baseConfig);

        this.config = mergeConfig(baseConfig, "v2");
        this.search = new SearchApi(this.config);
        this.booking = new BookingApi(this.config);
    }
}

