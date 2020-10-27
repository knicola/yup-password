import { Schema, StringSchema } from "yup";

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

declare function YupPassword(yup: Schema);

declare namespace YupPassword {
    export interface PasswordSchema extends StringSchema {
        minLowercase(length?: number, message?: string): PasswordSchema;
        minUppercase(length?: number, message?: string): PasswordSchema;
        minNumber(length?: number, message?: string): PasswordSchema;
        minSymbol(length?: number, message?: string): PasswordSchema;
        minRepeating(length?: number, message?: string): PasswordSchema;
        password(): PasswordSchema;
    }

    export class PasswordSchema implements StringSchema {}
}

export = YupPassword;
export default YupPassword;
