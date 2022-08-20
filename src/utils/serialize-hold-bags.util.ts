import { HoldBags } from "../types";

export function serializeHoldBags(obj: HoldBags) : HoldBags {
    if (Array.isArray(obj)) return obj.join(",");

    return obj;
}
