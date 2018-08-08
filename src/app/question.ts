export enum Qtype { QCM, QTEXT }

export class Question {
    id: Number;
    label: string;
    required: boolean;
    type: String;
}
