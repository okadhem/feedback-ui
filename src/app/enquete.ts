import { Question } from './question';

export class Enquete {
    titre: String;
    description: String;
    questions: Array<Question>;

    constructor(){
        this.questions = new Array<Question>();
    }
}
