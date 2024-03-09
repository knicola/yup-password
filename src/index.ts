/* eslint-disable
   @typescript-eslint/restrict-template-expressions,
   @typescript-eslint/method-signature-style,
   no-template-curly-in-string
*/

import type { Message } from 'yup'

declare module 'yup' {
    // for declaration merging to work, StringLocale prob needs to be exported from yup
    interface StringLocale {
        // ..rename params from length to min, max, etc?
        minLowercase?: Message<{ length: number }>
        minUppercase?: Message<{ length: number }>
        minNumbers?: Message<{ length: number }>
        minSymbols?: Message<{ length: number }>
        maxRepeating?: Message<{ length: number }>
        minWords?: Message<{ length: number }>
    }
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

// pluralize
function p (word: string, num: number): string {
    return num === 1 ? word : `${word}s`
}

const messages: Record<string, any> = {
    minLowercase: ({ path, length }) => `${path} must contain at least ${length} lowercase ${p('letter', length)}`,
    minUppercase: ({ path, length }) => `${path} must contain at least ${length} uppercase ${p('letter', length)}`,
    minNumbers: ({ path, length }) => `${path} must contain at least ${length} ${p('number', length)}`,
    minSymbols: ({ path, length }) => `${path} must contain at least ${length} ${p('symbol', length)}`,
    maxRepeating: ({ path, length }) => `${path} must not contain sequences of more than ${length} repeated characters`,
    minWords: ({ path, length }) => `${path} must contain at least ${length} ${p('word', length)}`,
}

function isNullOrUndefined (value: any): value is null | undefined {
    return value === null || value === undefined
}

export default function setup ({ setLocale, defaultLocale, addMethod, string }: typeof import('yup')): void {
    setLocale({ string: messages })
    const locale = defaultLocale.string as typeof messages

    addMethod(string, 'minLowercase', function minLowercase (length: number = 1, message: string = locale?.minLowercase) {
        return this.test({
            message,
            name: 'minLowercase',
            exclusive: true,
            params: { length },
            test (value) {
                return isNullOrUndefined(value) || (value.match(/[a-z]/g) || []).length >= length
            },
        })
    })

    addMethod(string, 'minUppercase', function minUppercase (length: number = 1, message: string = locale?.minUppercase) {
        return this.test({
            message,
            name: 'minUppercase',
            exclusive: true,
            params: { length },
            test (value) {
                return isNullOrUndefined(value) || (value.match(/[A-Z]/g) || []).length >= length
            },
        })
    })

    addMethod(string, 'minNumbers', function minNumbers (length: number = 1, message: string = locale?.minNumbers) {
        return this.test({
            message,
            name: 'minNumbers',
            exclusive: true,
            params: { length },
            test (value) {
                return isNullOrUndefined(value) || (value.match(/[0-9]/g) || []).length >= length
            },
        })
    })

    addMethod(string, 'minSymbols', function minSymbols (length: number = 1, message: string = locale?.minSymbols) {
        return this.test({
            message,
            name: 'minSymbols',
            exclusive: true,
            params: { length },
            test (value) {
                return isNullOrUndefined(value) || (value.match(/[^a-zA-Z0-9\s]/g) || []).length >= length
            },
        })
    })

    addMethod(string, 'maxRepeating', function maxRepeating (length: number = 2, message: string = locale?.maxRepeating) {
        return this.test({
            message,
            name: 'maxRepeating',
            exclusive: true,
            params: { length },
            test (value) {
                return isNullOrUndefined(value) || ! new RegExp(`(.)\\1{${length},}`).test(value)
            },
        })
    })

    addMethod(string, 'minWords', function minWords (length: number = 2, message: string = locale?.minWords) {
        return this.test({
            message,
            name: 'minWords',
            exclusive: true,
            params: { length },
            test (value) {
                return isNullOrUndefined(value) || value.split(' ').filter(v => !! v && /[a-zA-Z0-9]/.test(v)).length >= length
            },
        })
    })

    addMethod(string, 'password', function password () {
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
