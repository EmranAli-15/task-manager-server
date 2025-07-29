import Joi from "joi";

const createNote = Joi.object({
    title: Joi.string().empty(''),
    userId: Joi.string().required(),
    categoryId: Joi.string().required(),
    details: Joi.string().empty(''),
    color: Joi.object(),
    lists: Joi.array().items(Joi.string()),
    photos: Joi.array().items(Joi.string()),
})

const updateNote = Joi.object({
    userId: Joi.string().required(),
    categoryId: Joi.string().required(),
    title: Joi.string().empty(''),
    color: Joi.object(),
    details: Joi.string().empty(''),
    lists: Joi.array().items(Joi.string()),
    photos: Joi.array().items(Joi.string()),
})


export const noteValidation = {
    createNote,
    updateNote
};