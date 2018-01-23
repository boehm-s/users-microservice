import Joi from 'joi';

const validateFuncGen = schema => (opt = {}) => (req, res, next) => {
    const validation = opt.hasOwnProperty('presence') && false === opt.presence
	  ? Joi.validate(req.body, schema)
	  : Joi.validate(req.body, schema, {presence: "required"});

    return null === validation.error
	? next()
	: res.status(400).send(validation.error);
};

export default validateFuncGen;
