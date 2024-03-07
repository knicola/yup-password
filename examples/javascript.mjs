/* eslint-disable no-console */
'use strict'

import * as yup from 'yup'
import YupPassword from '../dist/index.js'
YupPassword(yup)

const schema = yup.object({
    password: yup.string().password(),
})

const input = {
    password: 'weak',
}

schema.validate(input, { abortEarly: false })
    .catch(e => console.error(e.errors))
