import { Meta } from "../interfaces";
import { Location } from "../interfaces";

export interface LocationsResponse {
    locations: Location[];
    meta: Meta;
    last_refresh: number;
    results_retrieved: number;
}
