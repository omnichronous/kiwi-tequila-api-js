export interface BookingConfirmPaymentResponse {
    /**
     * 0 (zero) that means the confirm_payment was successful,
     * any other result means that something went wrong
     */
    status: number;
}