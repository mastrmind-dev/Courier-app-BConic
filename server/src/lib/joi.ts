import Joi, { SchemaMap } from 'joi';

export const signup: SchemaMap = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
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

export const shipment: SchemaMap = {
  body: Joi.object({
    recipientEmail: Joi.string().email().required(),
    recipientName: Joi.string().required(),
    recipientAddress: Joi.string().required(),
    recipientContactNumber: Joi.string().required(),
    serviceType: Joi.string().required(),
    goodType: Joi.string().required(),
    weight: Joi.number().required(),
    packagingType: Joi.string().required(),
    paymentMethod: Joi.string().required(),
  }),
};

export const shipmentTrack: SchemaMap = {
  params: Joi.object({
    shipmentId: Joi.string().required(),
  }),
};
