import { Currency } from "../types";

export interface Price {
    currency: Currency;
    amount: number;
    base: number;
    service: number;
    service_flat: number;
    merchant: number;
}

export interface SegmentPrice extends Pick<Price, "currency"> {
    amount: string;
    base: string;
    service: string;
    service_flat: string;
    merchant: string;
}
