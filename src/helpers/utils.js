const validateReqBody = joiSchema => async (req, res, next) => {
    const checkBody = joiSchema.validate(req.body);

    return checkBody.error
        ? res.status(400).json({code: 400, message: checkBody.error.details.message})
        : next();
};

export default {validateReqBody};
