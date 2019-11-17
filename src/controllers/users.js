import Joi                 from '@hapi/joi';
import Bookshelf           from '../config/bookshelf';
import User                from '../models/user';
import userService         from '../services/users';

const joiSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).required()
});


const getAll = async (req, res, next) => {
    try {
        var users = await User.getAll();
    } catch (err) {
        req.log.error(err);
        return next(err);
    }

    return res.json(users);
};

const create = async (req, res, next) => {
    try {
        var user = await User.create(req.body);
    } catch (err) {
        /* istanbul ignore else  */
        if (err.code == 'ER_DUP_ENTRY') {
            const error = {
                code: 409,
                message: `[Conflict]\nEmail ${req.body.email} already taken.`
            };
            req.log.warn(err);
            return res.status(error.code).json(error);
        } else {
            req.log.error(err);
            return next(err);
        }
    }

    return res.json(user);
};

const updateById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const update = req.body;

    if (update.role && req.user.role !== "ADMIN") { /* only admin can modify role */
        const error = {
            code: 401,
            message: `[Unauthorized]\nOnly admin can change a user's role.`
        };

        req.log.warn(error);
        return res.status(401).json(error);
    }

    try {
        var user = await User.getRefById(id);
        var newUser = await user.update(update);
    } catch (err) {
        /* istanbul ignore else  */
        if (err.name == 'USER_NOT_FOUND') {
            const error = {
                code: 404,
                message: `[Not Found]\nUser with id ${id} not found.`
            };

            req.log.warn(error);
            return res.status(404).json(error);
        } else if (err.code == 'ER_NO_REFERENCED_ROW_2') {
            const error = {
                code: 400,
                message: `[Bad Request]\nCannot update user's role because role with id ${update.role} does not exists.`
            };

            req.log.warn(error);
            return res.status(400).json(error);
        } else {
            req.log.error(err);
            return next(err);
        }
    }

    return res.json(newUser);
};


const removeById = async (req, res, next) => {
    const id = req.params.id;

    try {
        var user = await User.getById(id);
        await User.delete(id);
    } catch (err) {
        /* istanbul ignore else  */
        if (err.name == 'USER_NOT_FOUND') {
            const error = {
                code: 404,
                message: `[Not Found]\nUser with id ${id} not found.`
            };

            req.log.warn(error);
            return res.status(404).json(error);
        } else {
            req.log.error(err);
            return next(err);
        }
    }

    return res.json(user);
};

export default {
    getAll,
    joiSchema,
    create,
    updateById,
    removeById
};
