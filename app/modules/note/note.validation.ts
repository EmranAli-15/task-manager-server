import Joi from "joi";

const createNote = Joi.object({
    title: Joi.string().required(),
    userId: Joi.string().required(),
    categoryId: Joi.string().required(),
    color: Joi.object(),
    details: Joi.string(),
    links: Joi.array().items(Joi.string()),
    photos: Joi.array().items(Joi.string()),
})

const updateNote = Joi.object({
    title: Joi.string().optional(),
    details: Joi.string().optional(),
    links: Joi.array().items(Joi.string()).optional(),
    photos: Joi.array().items(Joi.string()).optional(),
    color: Joi.object().optional(),
    categoryId: Joi.string().optional(),
})


export const noteValidation = {
    createNote,
    updateNote
};