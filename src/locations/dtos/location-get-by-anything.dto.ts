import { Simple } from "../../types";
import { Location } from "../interfaces";
import { CommonLocationDto } from "./common-location.dto";

export interface LocationGetByAnythingDto extends Pick<CommonLocationDto, "locale" | "active_only"> {
    /**
     * key is the field in response. To be used in conjunction with the 'value' field.
     * 
     * Example : int_id
     */
    key: keyof Location;
    /**
     * value of the field selected in key. To be used in conjunctions with the 'key' field.
     * It returns locations that match the specified conditions.
     * 
     * Example : 1555
     */
    value: Simple;
}
