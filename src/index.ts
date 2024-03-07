/* eslint-disable @typescript-eslint/method-signature-style, no-template-curly-in-string */

// NOTES.
// 1. error message pluralization will have to go away to support localization (reason: yup limitation)
// 2. (breaking) in a future release setup will be immediately invoked and the export will be removed

// pluralize
function p (word: string, num: number): string {
    return num === 1 ? word : `${word}s`
}

function isNullOrUndefined (value: any): value is null | undefined {
    return value === null || value === undefined
}

declare module 'yup' {
    interface StringSchema {
        minLowercase (length?: number, message?: string): StringSchema
        minUppercase (length?: number, message?: string): StringSchema
        minNumbers (length?: number, message?: string): StringSchema
        minSymbols (length?: number, message?: string): StringSchema
        maxRepeating (length?: number, message?: string): StringSchema
        minWords (length?: number, message?: string): StringSchema
        password (): StringSchema
    }
}

export default function setup (yup: typeof import('yup')): void {
    yup.addMethod(yup.string, 'minLowercase', function minLowercase (length: number = 1, message?: string) {
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
    })

    yup.addMethod(yup.string, 'minUppercase', function minUppercase (length: number = 1, message?: string) {
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
    })

    yup.addMethod(yup.string, 'minNumbers', function minNumbers (length: number = 1, message?: string) {
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
    })

    yup.addMethod(yup.string, 'minSymbols', function minSymbols (length: number = 1, message?: string) {
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
    })

    yup.addMethod(yup.string, 'maxRepeating', function maxRepeating (length: number = 2, message?: string) {
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
    })

    yup.addMethod(yup.string, 'minWords', function minWords (length: number = 2, message?: string) {
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
    })

    yup.addMethod(yup.string, 'password', function password () {
        return this
            .min(8)
            .max(250)
            .minLowercase(1)
            .minUppercase(1)
            .minNumbers(1)
            .minSymbols(1)
    })
} // setup()

module.exports = setup
