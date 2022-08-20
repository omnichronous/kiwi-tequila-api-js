import { SearchFlyLocation, SearchRadius } from "../interfaces";

export type SearchFlyLocations = SearchFlyLocation | SearchRadius | string | (SearchFlyLocation | SearchRadius | string)[];
