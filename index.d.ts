import * as Yup from "yup";

declare module "yup" {
    interface StringSchema {
        minLowercase(length?: number, message?: string): StringSchema;
        minUppercase(length?: number, message?: string): StringSchema;
        minNumbers(length?: number, message?: string): StringSchema;
        minSymbols(length?: number, message?: string): StringSchema;
        /**
         * @deprecated Use `.maxRepeating()` instead.
         */
        minRepeating(length?: number, message?: string): StringSchema;
        maxRepeating(length?: number, message?: string): StringSchema;
        minWords(length?: number, message?: string): StringSchema;
        password(): StringSchema;
    }
}

declare function YupPassword(yup: typeof Yup): void;

export default YupPassword;
