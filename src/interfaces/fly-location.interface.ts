import { FlyLocationType } from "../types";

export interface SearchFlyLocation {
    type: FlyLocationType;
    value: string | string[];
}
