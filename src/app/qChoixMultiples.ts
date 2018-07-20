import { Question } from './question';

export class QChoixMultiples extends Question {
    type = "Qcm";
    QCM_choices: Array<String>;

    constructor() {
        super();
        this.QCM_choices = new Array<String>();
    }
}
