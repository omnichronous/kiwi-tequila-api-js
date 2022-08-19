import { LocationTypes } from "../types";

import { CarRental } from "./car-rental.interface";
import { City } from "./city.interface";
import { DeparturePoint } from "./departure-point.interface";
import { LatLng } from "./lat-lng.interface";
import { Region } from "./region.interface";
import { Special } from "./special.interface";
import { Tag } from "./tag.interface";

export interface Location {
    id: string;
    int_id: number;
    airport_int_id: number;
    active: boolean;
    code: string;
    icao: string;
    name: string;
    slug: string;
    slug_en: string;
    alternative_names?: string[];
    rank: number;
    global_rank_dst: number;
    dst_popularity_score: number;
    timezone: string;
    city?: City;
    location?: LatLng;
    alternative_departure_points: DeparturePoint[];
    tags: Tag[];
    providers: number[];
    special: Special[];
    tourist_region: Region[];
    car_rentals: CarRental[];
    new_ground: boolean;
    routing_priority: number;
    type: LocationTypes;
}
