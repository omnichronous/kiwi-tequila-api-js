import { HandBags } from "../types";

export function serializeHandBags(obj: HandBags) : HandBags {
    if (Array.isArray(obj)) return obj.join(",");

    return obj;
}
