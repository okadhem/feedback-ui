import { Response } from './response';

export class ResponseMultValues extends Response {
    type = "ResponseMultValues";
    values: Array<String>;
    
    constructor() {
        super();
        this.values = new Array<String>();
    }
}
