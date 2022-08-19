import { Continent } from "./continent.interface";
import { Country } from "./country.interface";
import { Region } from "./region.interface";

export interface City {
    id: string;
    name: string;
    code: string;
    slug: string;
    autonomous_territory: null;
    country?: Country;
    region?: Region;
    nearby_country?: Country;
    continent?: Continent;
    subdivision: null;
}
