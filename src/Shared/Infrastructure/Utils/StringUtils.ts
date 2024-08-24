export class StringUtils {
    static isEmpty(value: string) {
        return value === null || value === undefined || value === "";
    }

    static isNotEmpty(value: string) {
        return !StringUtils.isEmpty(value);
    }
}