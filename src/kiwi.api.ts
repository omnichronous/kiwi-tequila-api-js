import { BookingApi, SearchApi, LocationsApi } from "./apis";
import { KiwiOptions } from "./config";
import { buildConfig, mergeConfig } from "./utils";

type SearchApiTypes = Pick<SearchApi, "singlecity" | "nomad" | "multicity">;

export class KiwiApi {
    static readonly partial = <T extends keyof SearchApiTypes>(options: KiwiOptions, type: T) => new KiwiPartialApi(options, type);
    static readonly singlecity = (options: KiwiOptions) => new KiwiPartialApi(options, "singlecity");
    static readonly multicity = (options: KiwiOptions) => new KiwiPartialApi(options, "multicity");
    static readonly nomad = (options: KiwiOptions) => new KiwiPartialApi(options, "nomad");
    readonly locations: LocationsApi;
    readonly search: SearchApi;
    readonly booking: BookingApi;
    constructor(options: KiwiOptions) {
        const baseConfig = buildConfig(options);
        this.locations = new LocationsApi(baseConfig);

        const config = mergeConfig(baseConfig, "v2");
        this.booking = new BookingApi(config);
        this.search = new SearchApi(config);
    }
}

export class KiwiPartialApi<T extends keyof SearchApiTypes> {
    readonly locations: LocationsApi;
    readonly booking: BookingApi;
    readonly search: SearchApi[T];
    constructor(options: KiwiOptions, type: T) {
        const api = new KiwiApi(options);

        this.locations = api.locations;
        this.booking = api.booking;
        // bind is required here to ensure the obj methods can access the obj props
        this.search = <SearchApi[T]>api.search[type].bind(api.search);
    }
}
