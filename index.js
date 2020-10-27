'use strict'

// pluralize
const p = function (word, num) {
    return num === 1 ? word : `${word}s`
}

function minLowercase(length = 1, message) {
    const msg = message || '${path} must contain at least ${length} lower-cased ' + p('letter', length)
    return this.test({
        name: 'minLowercase',
        exclusive: true,
        message: msg,
        params: { length },
        test(value) {
            return (value.match(/[a-z]/g) || []).length >= length
        }
    })
} // minLowercase()

function minUppercase(length = 1, message) {
    const msg = message || '${path} must contain at least ${length} upper-cased ' + p('letter', length)
    return this.test({
        name: 'minUppercase',
        exclusive: true,
        message: msg,
        params: { length },
        test(value) {
            return (value.match(/[A-Z]/g) || []).length >= length
        }
    })
} // minUppercase()

function minNumber(length = 1, message) {
    const msg = message || '${path} must contain at least ${length} ' + p('number', length)
    return this.test({
        name: 'minNumber',
        exclusive: true,
        message: msg,
        params: { length },
        test(value) {
            return (value.match(/[0-9]/g) || []).length >= length
        }
    })
} // minNumber()

function minSymbol(length = 1, message) {
    const msg = message || '${path} must contain at least ${length} ' + p('symbol', length)
    return this.test({
        name: 'minSymbol',
        exclusive: true,
        message: msg,
        params: { length },
        test(value) {
            return (value.match(/[^a-zA-Z0-9]/g) || []).length >= length
        }
    })
} // minSymbol()

function minRepeating(length = 2, message) {
    const msg = message || '${path} must not contain sequences of more than ${length} repeated ' + p('character', length)
    return this.test({
        name: 'minRepeating',
        exclusive: true,
        message: msg,
        params: { length: length },
        test(value) {
            return ! new RegExp(`(.)\\1{${length},}`).test(value)
        }
    })
} // minRepeating()

function password() {
    return this
        .min(8)
        .max(250)
        .minLowercase(1)
        .minUppercase(1)
        .minNumber(1)
        .minSymbol(1)
} // password()

const { string: StringSchema } = (function() {
    try {
        return require('yup')
    } catch (e) {
        throw Error('yup-password requires `yup` package to be installed.')
    }
})()

class PasswordSchema extends StringSchema {
    constructor() {
        super()
    }
}
PasswordSchema.prototype.minLowercase = minLowercase
PasswordSchema.prototype.minUppercase = minUppercase
PasswordSchema.prototype.minNumber = minNumber
PasswordSchema.prototype.minSymbol = minSymbol
PasswordSchema.prototype.minRepeating = minRepeating
PasswordSchema.prototype.password = password

function setup(yup) {
    yup.addMethod(yup.string, 'minLowercase', minLowercase)
    yup.addMethod(yup.string, 'minUppercase', minUppercase)
    yup.addMethod(yup.string, 'minNumber', minNumber)
    yup.addMethod(yup.string, 'minSymbol', minSymbol)
    yup.addMethod(yup.string, 'minRepeating', minRepeating)
    yup.addMethod(yup.string, 'password', password)
}

setup.PasswordSchema = PasswordSchema

module.exports = setup
