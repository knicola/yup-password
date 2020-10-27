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

##### Extend yup
```js
const yup = require('yup')

require('yup-password')(yup)

await yup.string().password().validate('input')
```

##### Password schema
```js
const { PasswordSchema } = require('yup-password')

const schema = new PasswordSchema()

await schema.password().validate('input')
```


## API

##### .password()
Password must meet the default requirements: at least 8 characters, at most 250 characters, at least 1 lower-cased letter, at least 1 upper-cased letter, at least 1 number and at least 1 symbol.
```js
const schema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().password().required(),
})

const input = {
    username: 'user@example.com',
    password: 'this password will faaaail',
}

try {
    const res = await schema.validate(password, { abortEarly: false })
} catch (e) {
    console.log(e.errors) // => [
    //   'password must be at least 8 characters',
    //   'password must contain at least 1 upper-cased letter',
    //   'password must contain at least 1 number',
    //   'password must contain at least 1 symbol',
    // ]
}
```

##### .minLowercase(length?: number = 1, message?: string)
Password must contain X amount of lower-cased letters or more.
```js
yup.string().minLowercase(1)
```

##### .minUppercase(length?: number = 1, message?: string)
Password must contain X amount of upper-cased letters or more.
```js
yup.string().minUppercase(1)
```

##### .minNumber(length?: number = 1, message?: string)
Password must contain X amount of numbers or more.
```js
yup.string().minNumber(1)
```

##### .minSymbol(length?: number = 1, message?: string)
Password must contain X amount of symbols or more.
```js
yup.string().minSymbol(1)
```

##### .minRepeating(length?: number = 2, message?: string)
Password must not contain a sequence of X amount of repeated characters. For example, if the limit is 2 `thiis` will pass but `thiiis` will not.
```js
yup.string().minRepeating(2)
```

## License

This project is open-sourced software licensed under the [MIT license](./LICENSE).
