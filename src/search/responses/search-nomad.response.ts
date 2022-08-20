import { SearchRoute } from "../interfaces";
import { Currency } from "../types";

export interface SearchNomadResponse extends Pick<SearchRoute,
                                            "baglimit" | "bags_price" | "booking_token" | 
                                            "deep_link" | "facilitated_booking_available" | 
                                            "price"> {
    /**
     * The currency parameter contains a currency code.
     * See fx_rate response parameter as well.
     */
    currency: Currency;
    route: SearchRoute[];
}