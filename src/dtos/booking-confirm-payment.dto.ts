import { BookingSaveResponse } from "../responses";

export interface BookingConfirmPaymentDto extends Pick<BookingSaveResponse, "booking_id" | "transaction_id"> {

}