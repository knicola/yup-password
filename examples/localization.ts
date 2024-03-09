/* eslint-disable no-console, no-template-curly-in-string */
import * as yup from 'yup'
import YupPassword from '../src'
YupPassword(yup)

// StringLocale declaration merging does not seem to
// work, so we have to declare yup password's locale
// overrides as a separate "Record" object.
const locale: Record<string, any> = {
    minSymbols: 'This is now localized. path=${path};length=${length}',
}

yup.setLocale({
    string: {
        ...locale,
        // Add other messages here
    },
})

const schema = yup.object({
    password: yup.string().password(),
})

const input = {
    password: 'Password1',
}

schema.validate(input, { abortEarly: false })
    .catch(e => console.error(e.errors))
