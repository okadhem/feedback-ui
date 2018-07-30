import { Question } from './question';

export class Enquete {
    title: String;
    description: String;
    visibility: Array<Person>;
    expirationDate: Date;
    questions: Array<Question>;
    constructor() {
        this.questions = new Array<Question>();
    }
}

export class Person {
    id: number;
    firstname: String;
    lastname: String;

    constructor(id: number) {
        this.id = id;
    }
}