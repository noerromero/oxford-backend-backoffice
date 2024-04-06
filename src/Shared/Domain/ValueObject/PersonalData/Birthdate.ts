import { DateValueObject } from "../Primitives/DateValueObject";

export class Birthdate extends DateValueObject {
    public static readonly ADULT_AGE : number = 18;

    constructor(input: string, isOptional: boolean = false) {
        super(input, isOptional, "Invalid birthdate format");
    }
}
