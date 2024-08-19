import { DateValueObject } from "../Primitives/DateValueObject";

export class Birthday extends DateValueObject {
    public static readonly ADULT_AGE : number = 18;

    constructor(input: string, ownerEntity: string, isOptional: boolean = false) {
        super(input, ownerEntity, isOptional, "Invalid birthday format");
    }
}
