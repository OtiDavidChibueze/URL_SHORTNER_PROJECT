// Shortener Schema Validation
import joi from 'joi'

const validUrl = joi.object({
    userId: joi.string().regex(/^[a-fA-F0-9]{24}$/),
    long_url: joi.string().required().trim(),
    create_your_short_url: joi.string().required().trim(),
})

const updateUrl = joi.object({
    long_url: joi.string().required().trim(),
    update_your_short_url: joi.string().required().trim(),
})

export { validUrl, updateUrl }

