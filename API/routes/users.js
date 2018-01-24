import express                  from 'express';
import passport			from '../../config/passport';
import usersCtrl                from './../controllers/users';
import {validateCreateUser,
	validateUserBody,
        transformUserBody,
        checkUpdateRights}      from './../controllers/validation/users';
import access                   from './../helpers/access';
import {meException}            from './../helpers/users';

const usersRoutes = express.Router();

usersRoutes.route('/')
    .get(access(['user', 'manager']),
	 usersCtrl.getAll)
    .post(access(['manager']),
          validateCreateUser,
          transformUserBody,
          usersCtrl.create);

usersRoutes.route('/login')
    .post(passport.authenticate('local'),
          (_req, res) => res.json({connected: true})
	 );

usersRoutes.route('/:id')
    .get(access(['user', 'manager'], meException),
	 usersCtrl.getById)
    .put(access(['manager'], meException),
         validateUserBody({presence: false}),
         checkUpdateRights,
         transformUserBody,
	 usersCtrl.updateById)
    .delete(access(['manager'], meException),
	    usersCtrl.deleteById);

export {usersRoutes};
