import { Response } from './response';

export class SurveyResponse {
    surveyId: Number;
    //value: String;
    responses: Array<Response>;

    constructor() {
        this.responses = new Array<Response>();
    }
}
