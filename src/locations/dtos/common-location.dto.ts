import { Sort } from "../enums";
import { LocationLocale, LocationTypes } from "../types";

export interface CommonLocationDto {
    /**
     * desired locale output - this is the language
     * of the results. Should any other locale be used
     * other than the specified locales, en-US is used.
     */
    locale?: LocationLocale;
    /**
     * desired location output
     */
    location_types?: LocationTypes | LocationTypes[];
    /**
     * Desired number of results in the output.
     */
    limit?: number;
    /**
     * default value = true. It displayes all active locations.
     */
    active_only?: boolean;
    /**
     * desired order of the output. For A->Z use 'name',
     * for Z->A use '-name'.
     */
    sort?: Sort;
}
