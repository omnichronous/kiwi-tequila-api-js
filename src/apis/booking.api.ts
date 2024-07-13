import { ofetch, FetchOptions } from "ofetch"
import { buildUrl, mergeConfig } from "../utils";
import { BookingCheckFlightDto, BookingConfirmPaymentDto, BookingSaveBodyDto, BookingSaveParamsDto } from "../dtos";
import { BookingCheckFlightsResponse, BookingConfirmPaymentResponse, BookingSaveResponse } from "../responses";

export class BookingApi {
    private readonly config: FetchOptions<'json'>;
    constructor(config: FetchOptions<'json'>) {
        this.config = mergeConfig(config, "booking");
    }

    /**
     * ## 1.1 Workflow of calling /check_flights
     * The /check_flights endpoint must be called repeatedly
     * throughout the whole flow until moving to the next call.
     * The workflow is divided into two phases:
     * 
     * ### 1st phase
     * Call this endpoint every 2 or 3 seconds until you receive
     * the following values in the properties essential to continue
     * with the booking flow:
     * 
     * * "flights_checked": true
     * * "price_change": false
     * * "flights_invalid": false
     * 
     * During this call, our system runs the price and availability
     * validation, and it is usually verified in under 10 seconds.
     * After this verification, the itinerary is ready to book.
     * 
     * ### 2nd phase
     * Keep calling this endpoint every 15 seconds in the background
     * until you get the customer details and proceed to the next call
     * /save_booking. Our system keeps checking any potential issues
     * with bookability.
     * 
     * ## 1.2 Important notes
     * ### 1.2.1 Booking token age
     * Call this endpoint right after the initial search when the booking
     * token is only seconds or minutes old. The maximum time limit between
     * the /search and /check_flights calls is 30 minutes. The older the
     * booking token gets, the more price changes can occur. Should you
     * call the /check_flights endpoint with a booking token older than 30
     * minutes, you might receive a 400 error Expired booking token.
     * 
     * ### 1.2.2 Price changes
     * If price_change returns true, look for the new price in the response
     * under total. If you receive the value true, it does not change in
     * the subsequent calls. In such cases, you can either notify your
     * customers (via a pop-up or similar message) or consume the changes
     * in the price.
     * 
     * ### 1.2.3 Invalid flights
     * If the value of flights_invalid returns true, the itinerary is not
     * available to book as it is either canceled by the airline or sold out.
     * You need to abandon the booking and start with a new search request.
     * This property needs to return the value false in a standard API workflow.
     * 
     * ## 1.3 Recommended flow on the partner’s website
     * We recommend repeatedly calling the /check_flights endpoint based on the
     * above requirements on your "Booking page" while the clients fill in
     * personal information, select ancillaries, and input payment details.
     * @param dto 
     * @returns 
     */
    async checkFlights(dto: BookingCheckFlightDto): Promise<BookingCheckFlightsResponse> {
        const data = await ofetch<BookingCheckFlightsResponse>(buildUrl("check_flights", dto), this.config);

        // todo: convert data fields

        return data;
    }

    /**
     * ## 2.1 Workflow of calling /save_booking
     * Call the /save_booking endpoint only once. This step triggers the creation
     * of the booking order in our system. Subsequently, it freezes the respective
     * amount of funds from the payment method you are using (Kiwi.com credits from
     * your deposit account or credit card). The system is awaiting confirming the
     * Kiwi.com credit transaction from your side.
     * 
     * This POST request requires several parameters in the body specifying the order.
     * These parameters are described below in section 2.3.
     * 
     * * Important note: Make sure that you validate the same properties as in the
     * /check_flights response, as the price may change, or the itinerary may become
     * unavailable even at this point.
     * * Abandoned booking: In case you abandon the booking after this call and do not
     * continue with /confirm_payment, the blocked funds are released back to your
     * payment method within 90 minutes.
     * 
     * ### 2.1.1 Zooz payments - under development
     * For Zooz payments, you need to add the parameter payment_gateway to the request
     * body with the value payu ("payment_gateway": "payu").
     * 
     * After this call, you need to move on to tokenizing the card data described in
     * the user guide Corporate Credit Card payment (currently under development).
     * 
     * ## 2.2 Recommended flow on the partner’s website
     * We recommend calling this endpoint right before your customer pays for the
     * booking on your website, that means, after inputting the necessary payment
     * details but before processing the payment by the finance entity. Never charge
     * the customer before validating the important /save_booking response properties
     * mentioned above.
     * 
     * ## 2.3 Save_booking request body parameters
     * #### health_declaration_checked (bool)
     * * An optional parameter connected to the COVID-19 requirements, applicable only
     * for specific airlines.
     * * Partner can add a confirmation of the health declaration to their front end
     * during the API flow.
     * * Partner is responsible to know which airlines require health declaration and
     * the passengers confirm that they meet the requirements.
     * * The health declaration can be also confirmed in Manage Booking up to 26 hours
     * prior to the departure.
     * * The health declaration must be confirmed to avoid failed check-in.
     * 
     * #### lang (string)
     * * Language, en is used as default.
     * * Use format ISO 639-1 for this string, en has to be lowercase.
     * 
     * #### passengers (array[string])
     * * List of passengers with their details.
     * * name (string) - first name
     *   * Middle name - if you need to add a middle name, please send it in this
     *     parameter in the following format: "first name|middle name".
     * * surname (string) - last name
     * 
     * * contact details - you need to provide these for at least one passenger in
     *   the booking, who has to be an adult.
     *   * email (string)
     *     * Our B2B partners need to use the email address connected to the deposit
     *       account in Tequila. Using a different email might result in errors when
     *       paying for the ancillaries in MMB with the Kiwi.com credits.
     *     * Should you need any rerouting to a different email address for the
     *       communication related to the booking, please contact us via the Tequila
     *       Helpdesk.
     *   * phone (string)
     *     * Our B2B partners have to use their company or dummy number (not passenger’s)
     *       to make sure no communication can get to the end passenger from the kiwi.com
     *       side.
     *     * Phone number is validated as per following regexp: ^+[1-9][0-9]{7,14}$
     *       * number prefix: [+] or [00]
     *       * number: [0-9] digits BUT must start with no-zero digit [1-9]
     *       * number length {8-14} digits (including country code)
     *   * cardno (string)
     *     * An alphanumeric string that represents a number of a travel document (ID or
     *       passport) with a maximum length of twenty characters. E.g. D54169411x
     *     * You can check whether we need the data in the check_flights response under
     *       document_need (please follow Important props for more details).
     *   * birthday (string) - date in YYYY-MM-DD format
     *   * nationality (string) - the nationality of the passenger which has to be in
     *     ISO 3166-1 alpha-2 format (not a country issuing the travel document)
     *   * title (string) - Mr and Ms only
     *   * expiration (string)
     *     * Expiration of the travel document in YYYY-MM-DD format
     *     * Note that most countries require at least six months until the document
     *       expires (from the time of departure of the last flight).
     *   * category (string) - adult, child, infant
     *     * Please choose the correct category according to the parameter
     *       age_category_thresholds from the check_flights response.
     *   * locale (string)
     *     * An optional parameter, en-US is used as default.
     *     * Use both formats ISO 639-1 and ISO 3166-1 for this string, two lowercase
     *       characters (indicating language as in lang parameter), a dash, and two
     *       uppercase characters (indicating country).
     *   * booking_token (string)
     *     * The same token you received in the search results and used in the check_flights
     *       request.
     *   * baggage (array)
     *     * The baggage logic is built around definitions and combinations, that allow you
     *       to order checked baggage, cabin bag, and personal item (if available in the itinerary).
     *     * Note that it is always necessary to order the baggage even when it is free of charge.
     *       You need to send the respective combination even though you are not ordering any baggage.
     *     * Please refer to the Buying baggage before the itinerary is booked for the process in detail.
     *   * session_id (string)
     *     * Required parameter, use the same value as in the check_flights requests.
     *   * payment_gateway (string) - under development
     *     * Applicable only for the Zooz payments.
     *     * The value of this parameter is payu.
     * @param dto 
     * @returns
     */
    async saveBooking(dto: BookingSaveBodyDto, params?: BookingSaveParamsDto): Promise<BookingSaveResponse> {
        const data = await ofetch<BookingSaveResponse>(buildUrl("save_booking", params), {
            method: 'post',
            body: dto,
            ...this.config
        });

        return data;
    }

    /**
     * ## 3.1 Confirm_payment
     * ### 3.1.1 Workflow of calling /confirm_payment
     * Call the /confirm_payment endpoint only once, ideally within seconds after a successful
     * /save_booking call. In the POST request body, specify the booking_id and transaction_id
     * retrieved from the /save_booking response.
     * 
     * When you receive a status: 0 in the response, the transaction is successful and the booking
     * order is confirmed in our system.
     * 
     * Important note: The maximum limit between these two calls is 30 minutes, and any later you may
     * receive an error response {"status": -1, "msg": "confirm payment timeout"}. The payment will
     * not be successfully processed and the order will not be completed.
     * 
     * ### 3.1.2 Recommended flow on the partner’s website
     * We recommend calling this endpoint right at the moment of a successful transaction between you
     * and your customer.
     */
    async confirmPayment(dto: BookingConfirmPaymentDto): Promise<BookingConfirmPaymentResponse> {
        const data = await ofetch<BookingConfirmPaymentResponse>("confirm_payment", {
            method: 'post',
            body: dto,
            ...this.config
        });

        return data;
    }
}