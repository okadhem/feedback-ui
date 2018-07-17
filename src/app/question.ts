export enum Qtype { QCM, QTEXT }

export class Question {
    qtype: Qtype;
    label: string;
    QCM_choices: Array<String>;
}
