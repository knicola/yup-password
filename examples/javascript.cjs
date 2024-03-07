/* eslint-disable no-console */
'use strict'

const yup = require('yup')
require('../dist/index.js')(yup)

const schema = yup.object({
    password: yup.string().password(),
})

const input = {
    password: 'weak',
}

schema.validate(input, { abortEarly: false })
    .catch(e => console.error(e.errors))
