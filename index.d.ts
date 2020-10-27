import { StringSchema } from "yup";

declare module 'yup' {
    interface StringSchema {
        minLowercase(length?: number, message?: string): StringSchema;
        minUppercase(length?: number, message?: string): StringSchema;
        minNumber(length?: number, message?: string): StringSchema;
        minSymbol(length?: number, message?: string): StringSchema;
        minRepeating(length?: number, message?: string): StringSchema;
        password(): StringSchema;
    }
}
