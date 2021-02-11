'use strict'

const yup = require('yup')
require('./index')(yup)
const schema = yup.string()

describe('Yup-Password Tests', () => {
    describe('Setup', () => {
        it('should add all password validation methods to yup', () => {
            expect(schema).toHaveProperty('minLowercase')
            expect(schema).toHaveProperty('minUppercase')
            expect(schema).toHaveProperty('minNumber')
            expect(schema).toHaveProperty('minSymbol')
            expect(schema).toHaveProperty('minRepeating')
            expect(schema).toHaveProperty('password')
        }) // test
    }) // group

    describe('.password()', () => {
        it('should require at least 8 characters', async () => {
            const case1 = await schema.password().isValid('aB1!')
            const case2 = await schema.password().isValid('aBCdEF1!')
            const case3 = await schema.password().isValid('has MORE 123 !!')
            expect(case1).toBeFalsy()
            expect(case2).toBeTruthy()
            expect(case3).toBeTruthy()
        }) // test
        it('should require at most 250 characters', async () => {
            // more than 250
            const case1 = await schema.password().isValid(
                'Eed7reeve1aiWoo9yoh7aet1vooVeighi7eicho3leicahweim' +
                'eengo4quoo1Chei3aBei0Shaxei0aivei2euNgaiz1eiri6jae' +
                '0af9aighai5eel3chohc1thaeyeisuangooghingohkahr9Giu' +
                'cisiu2neelaiY3meek8aTheith3Ta6eighiehei2ahtheeQuee' +
                '7zuth5te0Ahthaitaequae5ahghairai6Fiu0aisiet9kilad!' +
                'extra'
            )
            // exactly 250
            const case2 = await schema.password().isValid(
                'Eed7reeve1aiWoo9yoh7aet1vooVeighi7eicho3leicahweim' +
                'eengo4quoo1Chei3aBei0Shaxei0aivei2euNgaiz1eiri6jae' +
                '0af9aighai5eel3chohc1thaeyeisuangooghingohkahr9Giu' +
                'cisiu2neelaiY3meek8aTheith3Ta6eighiehei2ahtheeQuee' +
                '7zuth5te0Ahthaitaequae5ahghairai6Fiu0aisiet9kilad!'
            )
            // less than 250, exactly 8
            const case3 = await schema.password().isValid('aBCdEF1!')
            // less than 250, more than 8
            const case4 = await schema.password().isValid('has MORE 123 !!')
            expect(case1).toBeFalsy()
            expect(case2).toBeTruthy()
            expect(case3).toBeTruthy()
            expect(case4).toBeTruthy()
        }) // test
        it('should require at least one lowercase letter', async () => {
            const case1 = await schema.password().isValid('NO LOWERCASE 12 !')
            const case2 = await schema.password().isValid('HAS oNE 12 !')
            const case3 = await schema.password().isValid('HAS more 12 !')
            expect(case1).toBeFalsy()
            expect(case2).toBeTruthy()
            expect(case3).toBeTruthy()
        }) // test
        it('should require at least one uppercase letter', async () => {
            const case1 = await schema.password().isValid('no uppercase 12 !')
            const case2 = await schema.password().isValid('has One 12 !')
            const case3 = await schema.password().isValid('has MORE 12 !')
            expect(case1).toBeFalsy()
            expect(case2).toBeTruthy()
            expect(case3).toBeTruthy()
        }) // test
        it('should require at least one uppercase letter', async () => {
            const case1 = await schema.password().isValid('no uppercase 12 !')
            const case2 = await schema.password().isValid('has One 12 !')
            const case3 = await schema.password().isValid('has MORE 12 !')
            expect(case1).toBeFalsy()
            expect(case2).toBeTruthy()
            expect(case3).toBeTruthy()
        }) // test
        it('should require at least one number', async () => {
            const case1 = await schema.password().isValid('no NUMBER !')
            const case2 = await schema.password().isValid('has ONE 1 !')
            const case3 = await schema.password().isValid('has MORE 12 !')
            expect(case1).toBeFalsy()
            expect(case2).toBeTruthy()
            expect(case3).toBeTruthy()
        }) // test
        it('should require at least one symbol', async () => {
            const case1 = await schema.password().isValid('no SYMBOL 12')
            const case2 = await schema.password().isValid('has ONE 12 !')
            const case3 = await schema.password().isValid('has MORE 12 !!')
            expect(case1).toBeFalsy()
            expect(case2).toBeTruthy()
            expect(case3).toBeTruthy()
        }) // test
    }) // group

    describe('.minLowercase()', () => {
        it('should require a specified amount of lowercase letters', async () => {
            const case1 = await schema.minLowercase(1).isValid('HAS NONE')
            const case2 = await schema.minLowercase(10).isValid('has less')
            const case3 = await schema.minLowercase(9).isValid('has enough')
            const case4 = await schema.minLowercase(5).isValid('has more')
            const case5 = await schema.minLowercase(0).isValid('a')
            const case6 = await schema.minLowercase(0).isValid('')

            expect(case1).toBeFalsy()
            expect(case2).toBeFalsy()
            expect(case3).toBeTruthy()
            expect(case4).toBeTruthy()
            expect(case5).toBeTruthy()
            expect(case6).toBeTruthy()
        }) // test
        it('should default to length = 1 if none is provided', async () => {
            const case1 = await schema.minLowercase().isValid('a')
            const case2 = await schema.minLowercase().isValid('')
            const case3 = await schema.minLowercase().isValid('A')

            expect(case1).toBeTruthy()
            expect(case2).toBeFalsy()
            expect(case3).toBeFalsy()
        }) // test
        it('should return true if undefined', async () => {
            const res = await schema.minLowercase(1).isValid(undefined)

            expect(res).toBeTruthy()
        }) // test
    }) // group

    describe('.minUppercase()', () => {
        it('should require a specified amount of uppercase letters', async () => {
            const case1 = await schema.minUppercase(1).isValid('has none')
            const case2 = await schema.minUppercase(10).isValid('NOT ENOUGH')
            const case3 = await schema.minUppercase(9).isValid('HAS ENOUGH')
            const case4 = await schema.minUppercase(5).isValid('HAS MORE')
            const case5 = await schema.minUppercase(0).isValid('A')
            const case6 = await schema.minUppercase(0).isValid('')

            expect(case1).toBeFalsy()
            expect(case2).toBeFalsy()
            expect(case3).toBeTruthy()
            expect(case4).toBeTruthy()
            expect(case5).toBeTruthy()
            expect(case6).toBeTruthy()
        }) // test
        it('should default to length = 1 if none is provided', async () => {
            const case1 = await schema.minUppercase().isValid('A')
            const case2 = await schema.minUppercase().isValid('')
            const case3 = await schema.minUppercase().isValid('a')

            expect(case1).toBeTruthy()
            expect(case2).toBeFalsy()
            expect(case3).toBeFalsy()
        }) // test
        it('should return true if undefined', async () => {
            const res = await schema.minUppercase(1).isValid(undefined)

            expect(res).toBeTruthy()
        }) // test
    }) // group

    describe('.minNumber()', () => {
        it('should require a specified amount of numbers', async () => {
            const case1 = await schema.minNumber(1).isValid('has none')
            const case2 = await schema.minNumber(10).isValid('NOT ENOUGH 123')
            const case3 = await schema.minNumber(5).isValid('HAS ENOUGH 12345')
            const case4 = await schema.minNumber(5).isValid('HAS MORE 12345678')
            const case5 = await schema.minNumber(0).isValid('A')
            const case6 = await schema.minNumber(0).isValid('')

            expect(case1).toBeFalsy()
            expect(case2).toBeFalsy()
            expect(case3).toBeTruthy()
            expect(case4).toBeTruthy()
            expect(case5).toBeTruthy()
            expect(case6).toBeTruthy()
        }) // test
        it('should default to length = 1 if none is provided', async () => {
            const case1 = await schema.minNumber().isValid('1')
            const case2 = await schema.minNumber().isValid('')

            expect(case1).toBeTruthy()
            expect(case2).toBeFalsy()
        }) // test
        it('should return true if undefined', async () => {
            const res = await schema.minNumber(1).isValid(undefined)

            expect(res).toBeTruthy()
        }) // test
    }) // group

    describe('.minSymbol()', () => {
        it('should require a specified amount of symbols', async () => {
            const case1 = await schema.minSymbol(1).isValid('has none')
            const case2 = await schema.minSymbol(10).isValid('NOT ENOUGH !@#')
            const case3 = await schema.minSymbol(5).isValid('HAS ENOUGH !@#$%')
            const case4 = await schema.minSymbol(5).isValid('HAS MORE !@#$%^&')
            const case5 = await schema.minSymbol(0).isValid('A')
            const case6 = await schema.minSymbol(0).isValid('')

            expect(case1).toBeFalsy()
            expect(case2).toBeFalsy()
            expect(case3).toBeTruthy()
            expect(case4).toBeTruthy()
            expect(case5).toBeTruthy()
            expect(case6).toBeTruthy()
        }) // test
        it('should default to length = 1 if none is provided', async () => {
            const case1 = await schema.minSymbol().isValid('@')
            const case2 = await schema.minSymbol().isValid('')

            expect(case1).toBeTruthy()
            expect(case2).toBeFalsy()
        }) // test
        it('should return true if undefined', async () => {
            const res = await schema.minSymbol(1).isValid(undefined)

            expect(res).toBeTruthy()
        }) // test
    }) // group

    describe('.minRepeating()', () => {
        it('should not allow the same character repeated more than the specified amount in sequence', async () => {
            const case1 = await schema.minRepeating(2).isValid('lowercase aa')
            const case2 = await schema.minRepeating(2).isValid('uppercase AA')
            const case3 = await schema.minRepeating(2).isValid('numbers 11')
            const case4 = await schema.minRepeating(2).isValid('symbols !!')
            const case5 = await schema.minRepeating(2).isValid('lowercase aaa')
            const case6 = await schema.minRepeating(2).isValid('uppercase AAA')
            const case7 = await schema.minRepeating(2).isValid('numbers 111')
            const case8 = await schema.minRepeating(2).isValid('symbols !!!')
            const case9 = await schema.minRepeating(2).isValid('good measure aaBB11!!')
            const case10 = await schema.minRepeating(2).isValid('good measure aaaBBB111!!!')

            expect(case1).toBeTruthy()
            expect(case2).toBeTruthy()
            expect(case3).toBeTruthy()
            expect(case4).toBeTruthy()
            expect(case5).toBeFalsy()
            expect(case6).toBeFalsy()
            expect(case7).toBeFalsy()
            expect(case8).toBeFalsy()
            expect(case9).toBeTruthy()
            expect(case10).toBeFalsy()
        }) // test
        it('should default to length = 2 if none is provided', async () => {
            const case1 = await schema.minRepeating().isValid('')
            const case2 = await schema.minRepeating().isValid('@@')
            const case3 = await schema.minRepeating().isValid('@@@')

            expect(case1).toBeTruthy()
            expect(case2).toBeTruthy()
            expect(case3).toBeFalsy()
        }) // test
        it('should return true if undefined', async () => {
            const res = await schema.minRepeating(1).isValid(undefined)

            expect(res).toBeTruthy()
        }) // test
    }) // group
}) // group
