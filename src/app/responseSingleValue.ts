import { Response } from './response';

export class ResponseSingleValue extends Response {
    type = "ResponseSingleValue";
    value: String;
    
    constructor() {
        super();
    }
}
