import { Response } from './response';

export class SurveyResponse {
    idSurvey: Number;
    //value: String;
    responses: Array<Response>;

    constructor() {
        this.responses = new Array<Response>();
    }
}
