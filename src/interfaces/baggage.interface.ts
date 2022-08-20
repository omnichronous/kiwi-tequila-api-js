import { Price } from ".";
import { BaggageCategory, PassengerCategory } from "../types";

export interface BookingBaggage {
    price: Price;
    conditions: {
        passenger_groups: PassengerCategory[];
        is_priority?: string[];
    };
    /**
     * If “true,” the cabin bag needs to be put in hold
     */
    is_hold: boolean;
    category: BaggageCategory;
    restrictions: {
        dimensions_sum: number;
        weight: number;
        length: number;
        height: number;
        width: number;
    };
};

export interface BookingBaggageCombination extends Pick<BookingBaggage, "category" | "conditions" | "price"> {
    indices: number[];
}
