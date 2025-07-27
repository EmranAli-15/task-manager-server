import Joi from "joi";

const createNote = Joi.object({
    title: Joi.string().empty(''),
    userId: Joi.string().required(),
    categoryId: Joi.string().required(),
    details: Joi.string().empty(''),
    color: Joi.object(),
    links: Joi.array().items(Joi.string()),
    photos: Joi.array().items(Joi.string()),
})

const updateNote = Joi.object({
    userId: Joi.string().required(),
    categoryId: Joi.string().required(),
    title: Joi.string(),
    color: Joi.object(),
    details: Joi.string(),
    links: Joi.array().items(Joi.string()),
    photos: Joi.array().items(Joi.string()),
})


export const noteValidation = {
    createNote,
    updateNote
};