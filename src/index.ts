/* eslint-disable no-template-curly-in-string */
import type { StringSchema } from 'yup'

// pluralize
function p (word: string, num: number): string {
    return num === 1 ? word : `${word}s`
}

function isNullOrUndefined (value: any): value is null | undefined {
    return value === null || value === undefined
}

export function minLowercase (this: StringSchema, length: number = 1, message?: string): StringSchema {
    const msg = message || '${path} must contain at least ${length} lowercase ' + p('letter', length)
    return this.test({
        name: 'minLowercase',
        exclusive: true,
        message: msg,
        params: { length },
        test (value) {
            return isNullOrUndefined(value) || (value.match(/[a-z]/g) || []).length >= length
        },
    })
} // minLowercase()

export function minUppercase (this: StringSchema, length: number = 1, message?: string): StringSchema {
    const msg = message || '${path} must contain at least ${length} uppercase ' + p('letter', length)
    return this.test({
        name: 'minUppercase',
        exclusive: true,
        message: msg,
        params: { length },
        test (value) {
            return isNullOrUndefined(value) || (value.match(/[A-Z]/g) || []).length >= length
        },
    })
} // minUppercase()

export function minNumbers (this: StringSchema, length: number = 1, message?: string): StringSchema {
    const msg = message || '${path} must contain at least ${length} ' + p('number', length)
    return this.test({
        name: 'minNumbers',
        exclusive: true,
        message: msg,
        params: { length },
        test (value) {
            return isNullOrUndefined(value) || (value.match(/[0-9]/g) || []).length >= length
        },
    })
} // minNumber()

export function minSymbols (this: StringSchema, length: number = 1, message?: string): StringSchema {
    const msg = message || '${path} must contain at least ${length} ' + p('symbol', length)
    return this.test({
        name: 'minSymbols',
        exclusive: true,
        message: msg,
        params: { length },
        test (value) {
            return isNullOrUndefined(value) || (value.match(/[^a-zA-Z0-9\s]/g) || []).length >= length
        },
    })
} // minSymbol()

export function maxRepeating (this: StringSchema, length: number = 2, message?: string): StringSchema {
    const msg = message || '${path} must not contain sequences of more than ${length} repeated ' + p('character', length)
    return this.test({
        name: 'maxRepeating',
        exclusive: true,
        message: msg,
        params: { length },
        test (value) {
            return isNullOrUndefined(value) || ! new RegExp(`(.)\\1{${length},}`).test(value)
        },
    })
} // maxRepeating()

export function minWords (this: StringSchema, length: number = 2, message?: string): StringSchema {
    const msg = message || '${path} must contain at least ${length} ' + p('word', length)
    // eslint-disable-next-line prefer-regex-literals
    const rx = new RegExp('[a-zA-Z0-9]')
    return this.test({
        name: 'minWords',
        exclusive: true,
        message: msg,
        params: { length },
        test (value) {
            return isNullOrUndefined(value) || value.split(' ').filter(v => !! v && rx.test(v)).length >= length
        },
    })
} // minWords()

export function password (this: StringSchema): StringSchema {
    return this
        .min(8)
        .max(250)
        .minLowercase(1)
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1)
} // password()

declare module 'yup' {
    interface StringSchema {
        minLowercase: (length?: number, message?: string) => StringSchema
        minUppercase: (length?: number, message?: string) => StringSchema
        minNumbers: (length?: number, message?: string) => StringSchema
        minSymbols: (length?: number, message?: string) => StringSchema
        /**
         * @deprecated Use `.maxRepeating()` instead.
         */
        minRepeating: (length?: number, message?: string) => StringSchema
        maxRepeating: (length?: number, message?: string) => StringSchema
        minWords: (length?: number, message?: string) => StringSchema
        password: () => StringSchema
    }
}

export function setup (yup: typeof import('yup')): void {
    yup.addMethod(yup.string, 'minLowercase', minLowercase)
    yup.addMethod(yup.string, 'minUppercase', minUppercase)
    yup.addMethod(yup.string, 'minNumbers', minNumbers)
    yup.addMethod(yup.string, 'minSymbols', minSymbols)
    yup.addMethod(yup.string, 'minRepeating', maxRepeating)
    yup.addMethod(yup.string, 'maxRepeating', maxRepeating)
    yup.addMethod(yup.string, 'minWords', minWords)
    yup.addMethod(yup.string, 'password', password)
}

export default setup
module.exports = setup
