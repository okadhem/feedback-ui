import { Response } from './response';
import { Person } from './enquete';

export class SurveyResponse {
    surveyId: Number;
    //value: String;
    responses: Array<Response>;
    owner: Person;

    constructor() {
        this.responses = new Array<Response>();
    }
}
