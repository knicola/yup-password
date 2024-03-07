/* eslint-disable no-console */
import * as yup from 'yup'
import YupPassword from '../src'
YupPassword(yup)

const schema = yup.object({
    password: yup.string().password(),
})

const input = {
    password: 'weak',
}

schema.validate(input, { abortEarly: false })
    .catch(e => console.error(e.errors))
