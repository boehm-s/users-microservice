import _		from 'lodash';
import Joi		from 'joi';
import bcrypt		from 'bcrypt-then';
import roleModel	from './../../models/role';
import userModel        from './../../models/users';
import validateFuncGen	from './validateFuncGen';

const userSchema = Joi.object().keys({
    name: Joi.string(),
    marge: Joi.number().min(1).max(100),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.string()
});

const validateUserBody = validateFuncGen(userSchema);

const validateCreateUser = (req, res, next) => {
    req.body.marge = req.body.marge ? req.body.marge : 1;
    req.body.role = req.body.role ? req.body.role : 'user';

    const validation = Joi.validate(req.body, userSchema, {presence: "required"});

        return null === validation.error
	? next()
	: res.status(400).send(validation.error);

};

const transformUserBody = async (req, res, next) => {
    if ('me' !== req.params.id)
        req.params.id = parseInt(req.params.id);
    if (req.body.hasOwnProperty('role')) {
        const roles = (await roleModel.getAll()).toJSON();

        req.body.role = roles.map(role => role.name).includes(req.body.role)
            ? roles.find(role => role.name === req.body.role).id
            : roles.find(role => 'user' === role.name).id;
        // would be better to define roles priority and take the lowest
    }
    if (req.body.hasOwnProperty('password'))
        req.body.password = await bcrypt.hash(req.body.password, 10);

    /* la marge peut uniquement être modifiée par le manager du user en question */
    if (req.params.id && req.body.hasOwnProperty('marge') && 'me' !== req.params.id) {
	const user = (await userModel.getById(req.params.id)).toJSON();

	return user.manager === req.user.id
	    ? next()
	    : res.status(401).end(`Seul le manager ayant créé l'utilisateur est autorisé à modifier sa marge`);
    }

    return next();
};


const checkUpdateRights = async (req, res, next) => {
    const roles = (await roleModel.getAll()).toJSON();
    const userToUpdate = (await userModel.getById(req.params.id)).toJSON();
    const filter = ('user' === req.user.role || !roles.map(role => role.name).includes(req.body.role))
              ? ['email', 'password', 'marge']
              : ['email', 'password', 'marge', 'role'];

    /* si un manager essaie d'updater un manager autre que lui et idem pour un user */
    if (('manager' === userToUpdate.role && userToUpdate.id !== req.user.id)
       || 'user' === req.user.role && userToUpdate.id !== req.user.id)
        return res.status(403).end('Forbidden');

    req.body = _.pick(req.body, filter);
    return next();
};

export {validateCreateUser, validateUserBody, transformUserBody, checkUpdateRights};
