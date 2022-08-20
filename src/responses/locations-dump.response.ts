import { LocationsResponse } from "./locations.response";

export interface LocationsDumpResponse extends LocationsResponse {
    search_after: string[];
}
