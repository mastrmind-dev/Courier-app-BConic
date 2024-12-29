import Joi, { SchemaMap } from 'joi';

export const signup: SchemaMap = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    address: Joi.string().required(),
    contactNumber: Joi.string().required(),
  }),
};

export const login: SchemaMap = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
