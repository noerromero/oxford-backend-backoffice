export class StringUtils {
    static isEmpty(value: string) {
        return value === null || value === undefined || value === "";
    }
}