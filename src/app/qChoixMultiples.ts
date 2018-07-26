import { Question } from './question';

export class QChoixMultiples extends Question {
    type = "QMultChoices";
    choices: Array<String>;

    constructor() {
        super();
        this.choices = new Array<String>();
    }
}
