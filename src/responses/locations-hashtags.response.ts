import { Meta } from "../interfaces";

export interface LocationsHashtagsResponse {
    hashtags: string[];
    meta: Meta;
    last_refresh: number;
    results_retrieved: number;
}
