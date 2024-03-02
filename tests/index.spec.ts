'use strict'

import * as yup from 'yup'
import YupPassword from '../src'
YupPassword(yup)
const schema = yup.string()

describe('Yup-Password Tests', () => {
    describe('Setup', () => {
        it('should add all password validation methods to yup', () => {
            expect(schema).toHaveProperty('minLowercase')
            expect(schema).toHaveProperty('minUppercase')
            expect(schema).toHaveProperty('minNumbers')
            expect(schema).toHaveProperty('minSymbols')
            expect(schema).toHaveProperty('maxRepeating')
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
                'extra',
            )
            // exactly 250
            const case2 = await schema.password().isValid(
                'Eed7reeve1aiWoo9yoh7aet1vooVeighi7eicho3leicahweim' +
                'eengo4quoo1Chei3aBei0Shaxei0aivei2euNgaiz1eiri6jae' +
                '0af9aighai5eel3chohc1thaeyeisuangooghingohkahr9Giu' +
                'cisiu2neelaiY3meek8aTheith3Ta6eighiehei2ahtheeQuee' +
                '7zuth5te0Ahthaitaequae5ahghairai6Fiu0aisiet9kilad!',
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

    describe('.minNumbers()', () => {
        it('should require a specified amount of numbers', async () => {
            const case1 = await schema.minNumbers(1).isValid('has none')
            const case2 = await schema.minNumbers(10).isValid('NOT ENOUGH 123')
            const case3 = await schema.minNumbers(5).isValid('HAS ENOUGH 12345')
            const case4 = await schema.minNumbers(5).isValid('HAS MORE 12345678')
            const case5 = await schema.minNumbers(0).isValid('A')
            const case6 = await schema.minNumbers(0).isValid('')

            expect(case1).toBeFalsy()
            expect(case2).toBeFalsy()
            expect(case3).toBeTruthy()
            expect(case4).toBeTruthy()
            expect(case5).toBeTruthy()
            expect(case6).toBeTruthy()
        }) // test
        it('should default to length = 1 if none is provided', async () => {
            const case1 = await schema.minNumbers().isValid('1')
            const case2 = await schema.minNumbers().isValid('')

            expect(case1).toBeTruthy()
            expect(case2).toBeFalsy()
        }) // test
        it('should return true if undefined', async () => {
            const res = await schema.minNumbers(1).isValid(undefined)

            expect(res).toBeTruthy()
        }) // test
    }) // group

    describe('.minSymbols()', () => {
        it('should require a specified amount of symbols', async () => {
            const case1 = await schema.minSymbols(1).isValid('has none')
            const case2 = await schema.minSymbols(10).isValid('NOT ENOUGH !@#')
            const case3 = await schema.minSymbols(5).isValid('HAS ENOUGH !@#$%')
            const case4 = await schema.minSymbols(5).isValid('HAS MORE !@#$%^&')
            const case5 = await schema.minSymbols(0).isValid('A')
            const case6 = await schema.minSymbols(0).isValid('')

            expect(case1).toBeFalsy()
            expect(case2).toBeFalsy()
            expect(case3).toBeTruthy()
            expect(case4).toBeTruthy()
            expect(case5).toBeTruthy()
            expect(case6).toBeTruthy()
        }) // test
        it('should default to length = 1 if none is provided', async () => {
            const case1 = await schema.minSymbols().isValid('@')
            const case2 = await schema.minSymbols().isValid('')

            expect(case1).toBeTruthy()
            expect(case2).toBeFalsy()
        }) // test
        it('should return true if undefined', async () => {
            const res = await schema.minSymbols(1).isValid(undefined)

            expect(res).toBeTruthy()
        }) // test
    }) // group

    describe('.maxRepeating()', () => {
        it('should not allow the same character repeated more than the specified amount in sequence', async () => {
            const case1 = await schema.maxRepeating(2).isValid('lowercase aa')
            const case2 = await schema.maxRepeating(2).isValid('uppercase AA')
            const case3 = await schema.maxRepeating(2).isValid('numbers 11')
            const case4 = await schema.maxRepeating(2).isValid('symbols !!')
            const case5 = await schema.maxRepeating(2).isValid('lowercase aaa')
            const case6 = await schema.maxRepeating(2).isValid('uppercase AAA')
            const case7 = await schema.maxRepeating(2).isValid('numbers 111')
            const case8 = await schema.maxRepeating(2).isValid('symbols !!!')
            const case9 = await schema.maxRepeating(2).isValid('good measure aaBB11!!')
            const case10 = await schema.maxRepeating(2).isValid('good measure aaaBBB111!!!')

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
            const case1 = await schema.maxRepeating().isValid('')
            const case2 = await schema.maxRepeating().isValid('@@')
            const case3 = await schema.maxRepeating().isValid('@@@')

            expect(case1).toBeTruthy()
            expect(case2).toBeTruthy()
            expect(case3).toBeFalsy()
        }) // test
        it('should return true if undefined', async () => {
            const res = await schema.maxRepeating(1).isValid(undefined)

            expect(res).toBeTruthy()
        }) // test
    }) // group

    describe('.minWords()', () => {
        it('should require a specified amount of words', async () => {
            const case1 = await schema.minWords(3).isValid('just enough words')
            const case2 = await schema.minWords(3).isValid('more than enough words')
            const case3 = await schema.minWords(4).isValid('not enough words')

            expect(case1).toBeTruthy()
            expect(case2).toBeTruthy()
            expect(case3).toBeFalsy()
        }) // test
        it('should recognize a sequence of characters as a word so long as it contains letters or numbers', async () => {
            const case1 = await schema.minWords(5).isValid('this is the 1st test')
            const case2 = await schema.minWords(4).isValid('this is a test!@#$%^')
            const case3 = await schema.minWords(4).isValid('this.1 is/2 a3! test4@')
            const case4 = await schema.minWords(2).isValid('1337 53cr37')
            const case5 = await schema.minWords(2).isValid('!@#$ (*&^%')

            expect(case1).toBeTruthy()
            expect(case2).toBeTruthy()
            expect(case3).toBeTruthy()
            expect(case4).toBeTruthy()
            expect(case5).toBeFalsy()
        }) // test
        it('should default to length = 2 if none is provided', async () => {
            const case1 = await schema.minWords().isValid('small words')
            const case2 = await schema.minWords().isValid('simple words')
            const case3 = await schema.minWords().isValid('blank')
            const case4 = await schema.minWords().isValid('')
            const case5 = await schema.minWords().isValid(null)

            expect(case1).toBeTruthy()
            expect(case2).toBeTruthy()
            expect(case3).toBeFalsy()
            expect(case4).toBeFalsy()
            expect(case5).toBeFalsy()
        }) // test
        it('should return true if undefined', async () => {
            const res = await schema.minWords(1).isValid(undefined)

            expect(res).toBeTruthy()
        }) // test
    }) // group
}) // group
