import Joi from "joi";

const createUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
});

export const userValidation = {
    createUser
}