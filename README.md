# Yup-Password

[Yup](https://github.com/jquense/yup), dead simple password validation.


## Install

Using npm:
```sh
$ npm install yup-password
```

Using yarn:
```sh
$ yarn add yup-password
```


## Usage
Plug and play:
```js
// ES6
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup
```
```js
// CommonJs
const yup = require('yup')
require('yup-password')(yup) // extend yup
```
```js
// Build schema
const schema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().password().required(),
})

const input = {
    username: 'user@example.com',
    password: 'secret',
}

try {
    // validate
    const res = await schema.validate(input, { abortEarly: false })
    //  ...
} catch (e) {
    console.log(e.errors) // => [
    //   'password must be at least 8 characters',
    //   'password must contain at least 1 uppercase letter',
    //   'password must contain at least 1 number',
    //   'password must contain at least 1 symbol',
    // ]
}
```
Override, disable or add additional rules:
```js
const schema = yup.string().password()
    .minLowercase(8) // raise the lowercase requirement to 8
    .min(0) // disable minimum characters completely
    .minWords(2) // add an additional rule

try {
    const res = await schema.validate('secret')
    //  ...
} catch(e) {
    console.log(e.errors) // => [
    //   'password must contain at least 2 words',              <-- added
    //   'password must contain at least 8 lowercase letters',  <-- overridden
    //   'password must contain at least 1 uppercase letter',
    //   'password must contain at least 1 number',
    //   'password must contain at least 1 symbol',
    // ]
}
```
Pick and choose your password rules:
```js
const schema = yup.string().min(6).minUppercase(3).minRepeating(2).minWords(2)

await schema.isValid('Now, THIS is some password.') // => true
await schema.isValid('But thiiis is not.') // => false
```

## API

#### .password()
Password must meet the default requirements: at least 8 characters, at most 250 characters, at least 1 lowercase letter, at least 1 uppercase letter, at least 1 number and at least 1 symbol.
```js
const schema = yup.string().password()
```

#### .minLowercase(length?: number = 1, message?: string)
Password must contain X amount of lowercase letters or more.
```js
const schema = yup.string().minLowercase(3, 'custom message')
```

#### .minUppercase(length?: number = 1, message?: string)
Password must contain X amount of uppercase letters or more.
```js
const schema = yup.string().minUppercase(3, 'custom message')
```

#### [Deprecated] .minNumber(length?: number = 1, message?: string)
Use `.minNumbers()` instead.
#### .minNumbers(length?: number = 1, message?: string)
Password must contain X amount of numbers or more.
```js
const schema = yup.string().minNumbers(3, 'custom message')
```

#### [Deprecated] .minSymbol(length?: number = 1, message?: string)
Use `.minSymbols()` instead.
#### .minSymbols(length?: number = 1, message?: string)
Password must contain X amount of symbols or more.
```js
const schema = yup.string().minSymbols(3, 'custom message')
```

#### .minRepeating(length?: number = 2, message?: string)
Password must not contain a sequence of X amount of repeated characters. For example, if the limit is 2 `thiis` will pass but `thiiis` will not.
```js
const schema = yup.string().minRepeating(3, 'custom message')
```

#### .minWords(length?: number = 2, message?: string)
Password must contain X amount of words or more. So long as a sequence of characters contains letters or numbers,
it will be recognized as a word. For example `secret`, `1st!` and `1337` count as words, but `!@#$%` does not.
```js
const schema = yup.string().minWords(3, 'custom message')
```

## License

This project is open-sourced software licensed under the [MIT license](./LICENSE).
