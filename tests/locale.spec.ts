/* eslint-disable
   no-template-curly-in-string
*/

import * as yup from 'yup'
import setup from '../src'
setup(yup)
const schema = yup.string()

describe('Locale support', () => {
    describe('test default message: singular', () => {
        test('minLowercase()', async () => {
            const errorMessage = await schema.minLowercase(1).validate('A').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 1 lowercase letter')
        })

        test('minUppercase()', async () => {
            const errorMessage = await schema.minUppercase(1).validate('a').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 1 uppercase letter')
        })

        test('minNumbers()', async () => {
            const errorMessage = await schema.minNumbers(1).validate('a').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 1 number')
        })

        test('minSymbols()', async () => {
            const errorMessage = await schema.minSymbols(1).validate('a').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 1 symbol')
        })

        test('maxRepeating()', async () => {
            const errorMessage = await schema.maxRepeating(1).validate('aa').catch(e => e.message)
            expect(errorMessage).toBe('this must not contain sequences of more than 1 repeated characters')
        })

        test('minWords()', async () => {
            const errorMessage = await schema.minWords(1).validate('$').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 1 word')
        })
    }) // group

    describe('test default message: plural', () => {
        test('minLowercase()', async () => {
            const errorMessage = await schema.minLowercase(2).validate('a').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 2 lowercase letters')
        })

        test('minUppercase()', async () => {
            const errorMessage = await schema.minUppercase(2).validate('A').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 2 uppercase letters')
        })

        test('minNumbers()', async () => {
            const errorMessage = await schema.minNumbers(2).validate('1').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 2 numbers')
        })

        test('minSymbols()', async () => {
            const errorMessage = await schema.minSymbols(2).validate('!').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 2 symbols')
        })

        test('maxRepeating()', async () => {
            const errorMessage = await schema.maxRepeating(2).validate('aaa').catch(e => e.message)
            expect(errorMessage).toBe('this must not contain sequences of more than 2 repeated characters')
        })

        test('minWords()', async () => {
            const errorMessage = await schema.minWords(2).validate('a').catch(e => e.message)
            expect(errorMessage).toBe('this must contain at least 2 words')
        })
    }) // group

    describe('test localized message', () => {
        beforeAll(() => {
            yup.setLocale({
                string: {
                    minLowercase: 'name=minLowercase;path=${path};length=${length}',
                    minUppercase: 'name=minUppercase;path=${path};length=${length}',
                    minNumbers: 'name=minNumbers;path=${path};length=${length}',
                    minSymbols: 'name=minSymbols;path=${path};length=${length}',
                    maxRepeating: 'name=maxRepeating;path=${path};length=${length}',
                    minWords: 'name=minWords;path=${path};length=${length}',
                } as any,
            })
        })
        test('minLowercase()', async () => {
            const errorMessage = await schema.minLowercase(2).validate('a').catch(e => e.message)
            expect(errorMessage).toBe('name=minLowercase;path=this;length=2')
        })

        test('minUppercase()', async () => {
            const errorMessage = await schema.minUppercase(2).validate('A').catch(e => e.message)
            expect(errorMessage).toBe('name=minUppercase;path=this;length=2')
        })

        test('minNumbers()', async () => {
            const errorMessage = await schema.minNumbers(2).validate('1').catch(e => e.message)
            expect(errorMessage).toBe('name=minNumbers;path=this;length=2')
        })

        test('minSymbols()', async () => {
            const errorMessage = await schema.minSymbols(2).validate('!').catch(e => e.message)
            expect(errorMessage).toBe('name=minSymbols;path=this;length=2')
        })

        test('maxRepeating()', async () => {
            const errorMessage = await schema.maxRepeating(2).validate('aaa').catch(e => e.message)
            expect(errorMessage).toBe('name=maxRepeating;path=this;length=2')
        })

        test('minWords()', async () => {
            const errorMessage = await schema.minWords(2).validate('a').catch(e => e.message)
            expect(errorMessage).toBe('name=minWords;path=this;length=2')
        })
    }) // group
}) // group
