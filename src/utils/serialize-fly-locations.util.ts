import { SearchFlyLocation, SearchRadius } from "../interfaces";
import { SearchFlyLocations } from "../types";

export function serializeFlyLocations(input: SearchFlyLocations) : string[] {
    if (Array.isArray(input)) {
        return input.flatMap(serializeFlyLocations);
    }

    if (isSearchFlyLocation(input)) {
        const { type, value } = input;

        if (Array.isArray(value)) {
            return value.map(v => `${type}:${v}`);
        }

        return [`${type}:${value}`];
    }

    if (isSearchRadius(input)) {
        const { lat, lon, xkm } = input;

        return [`${lat}-${lon}-${xkm}km`];
    }

    return [input];
}

function isSearchFlyLocation(obj: unknown): obj is SearchFlyLocation {
    return !!obj &&
        typeof obj === "object" &&
        "type" in obj &&
        "value" in obj;
}

function isSearchRadius(obj: unknown): obj is SearchRadius {
    return !!obj &&
        typeof obj === "object" &&
        "lat" in obj &&
        "lon" in obj &&
        "xkm" in obj;
}
