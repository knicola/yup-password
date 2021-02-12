'use strict'

// pluralize
const p = function (word, num) {
    return num === 1 ? word : `${word}s`
}

const isNullOrUndefined = function (value) {
    return value === null || value === undefined
}

function minLowercase(length = 1, message) {
    const msg = message || '${path} must contain at least ${length} lowercase ' + p('letter', length)
    return this.test({
        name: 'minLowercase',
        exclusive: true,
        message: msg,
        params: { length },
        test(value) {
            return isNullOrUndefined(value) || (value.match(/[a-z]/g) || []).length >= length
        }
    })
} // minLowercase()

function minUppercase(length = 1, message) {
    const msg = message || '${path} must contain at least ${length} uppercase ' + p('letter', length)
    return this.test({
        name: 'minUppercase',
        exclusive: true,
        message: msg,
        params: { length },
        test(value) {
            return isNullOrUndefined(value) || (value.match(/[A-Z]/g) || []).length >= length
        }
    })
} // minUppercase()

function minNumbers(length = 1, message) {
    const msg = message || '${path} must contain at least ${length} ' + p('number', length)
    return this.test({
        name: 'minNumber',
        exclusive: true,
        message: msg,
        params: { length },
        test(value) {
            return isNullOrUndefined(value) || (value.match(/[0-9]/g) || []).length >= length
        }
    })
} // minNumber()

function minSymbols(length = 1, message) {
    const msg = message || '${path} must contain at least ${length} ' + p('symbol', length)
    return this.test({
        name: 'minSymbol',
        exclusive: true,
        message: msg,
        params: { length },
        test(value) {
            return isNullOrUndefined(value) || (value.match(/[^a-zA-Z0-9\s]/g) || []).length >= length
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
            return isNullOrUndefined(value) || ! new RegExp(`(.)\\1{${length},}`).test(value)
        }
    })
} // minRepeating()

function minWords(length = 2, message) {
    const msg = message || '${path} must contain at least ${length} ' + p('word', length)
    const rx = new RegExp('[a-zA-Z0-9]')
    return this.test({
        name: 'minWords',
        exclusive: true,
        message: msg,
        params: { length: length },
        test(value) {
            return isNullOrUndefined(value) || value.split(' ').filter(v => !! v && rx.test(v)).length >= length
        }
    })
} // minWords()

function password() {
    return this
        .min(8)
        .max(250)
        .minLowercase(1)
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1)
} // password()

function setup(yup) {
    yup.addMethod(yup.string, 'minLowercase', minLowercase)
    yup.addMethod(yup.string, 'minUppercase', minUppercase)
    yup.addMethod(yup.string, 'minNumber', minNumbers)
    yup.addMethod(yup.string, 'minNumbers', minNumbers)
    yup.addMethod(yup.string, 'minSymbol', minSymbols)
    yup.addMethod(yup.string, 'minSymbols', minSymbols)
    yup.addMethod(yup.string, 'minRepeating', minRepeating)
    yup.addMethod(yup.string, 'minWords', minWords)
    yup.addMethod(yup.string, 'password', password)
}

module.exports = setup
