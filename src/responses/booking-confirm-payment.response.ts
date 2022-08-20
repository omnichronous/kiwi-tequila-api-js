export interface BookingConfirmPaymentResponse {
    /**
     * 0 (zero) that means the confirm_payment was successful,
     * any other result means that something went wrong
     * payment status: 0: payment success, the BID is created. 1: payment failed.
     */
    status: 0 | 1 | -1;
    msg?: string;
}
