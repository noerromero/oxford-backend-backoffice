import { DateValueObject } from "../Primitives/DateValueObject";

export class Birthdate extends DateValueObject {
    constructor(input: string, isOptional: boolean = false) {
        super(input, isOptional, "Invalid birthdate format");
    }
}
