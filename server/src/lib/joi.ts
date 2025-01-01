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
    serviceType: Joi.string().valid('express', 'economy', 'standard').required(),
    goodType: Joi.string().valid('fragile', 'electronic', 'perishable', 'flammable').required(),
    weight: Joi.number().required(),
    packagingType: Joi.string().valid('box', 'envelop').required(),
    paymentMethod: Joi.string().valid('cash on delivery', 'online', 'credit card').required(),
  }),
};

export const shipmentId: SchemaMap = {
  params: Joi.object({
    shipmentId: Joi.string().required(),
  }),
};

export const trackingStatus: SchemaMap = {
  params: Joi.object({
    shipmentId: Joi.string().required(),
  }),
  body: Joi.object({
    trackingStatus: Joi.string().required(),
  }),
};
