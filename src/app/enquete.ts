import { Question } from './question';

export class Enquete {
    id: Number;
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
    firstName: String;
    lastName: String;
    fullName: String;
    constructor(id: number) {
        this.id = id;
    }
}