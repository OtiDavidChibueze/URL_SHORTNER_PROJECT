// User Schema Validation
import joi from 'joi'

const validate = joi.object({
    name: joi.string().required().max(20),
    email: joi.string().required().email(),
    password: joi.string().min(6).required(),
    urls: joi.array()
})
export { validate }

