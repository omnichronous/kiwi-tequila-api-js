import { FlyLocation, Radius } from "../interfaces";

export type FlyLocations = FlyLocation | Radius | string | (FlyLocation | Radius | string)[];
