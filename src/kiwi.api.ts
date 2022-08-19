import { KiwiOptions } from "./config";
import { LocationsApi } from "./locations/locations.api";
import { buildConfig } from "./utils";


export class KiwiApi {
    locations: LocationsApi;
    constructor(options: KiwiOptions) {
        const config = buildConfig(options);
        this.locations = new LocationsApi(config);
    }
}

