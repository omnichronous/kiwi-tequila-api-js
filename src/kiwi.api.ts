import { AxiosRequestConfig } from "axios";
import { BookingApi, SearchApi, LocationsApi } from "./apis";
import { KiwiOptions } from "./config";
import { buildConfig, mergeConfig } from "./utils";

type SearchApiTypes = Pick<SearchApi, "singlecity" | "nomad" | "multicity">;

interface KiwiPartialApi<T extends keyof SearchApiTypes> {
    locations: LocationsApi;
    booking: BookingApi;
    search: SearchApi[T];
}

export class KiwiApi {
    static create<T extends keyof SearchApiTypes>(options: KiwiOptions & {
        apiKeyType: T;
    }) : KiwiPartialApi<T> {
        const api = new KiwiApi(options);

        return {
            locations: api.locations,
            search: api.search[options.apiKeyType],
            booking: api.booking,
        };

    }

    static oneWayReturn(options: KiwiOptions): KiwiPartialApi<"singlecity"> {
        return KiwiApi.create({
            ...options,
            apiKeyType: "singlecity"
        });
    }

    static multicity(options: KiwiOptions): KiwiPartialApi<"multicity"> {
        return KiwiApi.create({
            ...options,
            apiKeyType: "multicity"
        });
    }

    static nomad(options: KiwiOptions): KiwiPartialApi<"nomad"> {
        return KiwiApi.create({
            ...options,
            apiKeyType: "nomad"
        });
    }
    locations: LocationsApi;
    // search: SearchApi;
    search: SearchApi;
    booking: BookingApi;
    private config: AxiosRequestConfig;
    constructor(options: KiwiOptions) {
        const baseConfig = buildConfig(options);
        this.locations = new LocationsApi(baseConfig);

        this.config = mergeConfig(baseConfig, "v2");
        this.booking = new BookingApi(this.config);
        this.search = new SearchApi(this.config);
    }
}

