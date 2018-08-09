import { Question } from './question';

export class QCheckbox extends Question {
    type = "QMultChoicesMultAnswers";
    choices: Array<String>;

    constructor() {
        super();
        this.choices = new Array<String>();
    }
}
