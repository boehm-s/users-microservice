import express                  from 'express';
import usersCtrl                from './../controllers/users';
import {controllerHandler as c} from './../helpers/utils';

const usersRoutes = express.Router();

usersRoutes.route('/')
    .get(c(usersCtrl.getAll))
    .post(c(usersCtrl.create, req => req.body));

usersRoutes.route('/:id')
    .get(c(usersCtrl.getById, req => req.params.id))
    .put(c(usersCtrl.updateById, req => req.params.id))
    .delete(c(usersCtrl.deleteById, req => req.params.id));

export {usersRoutes};
export default usersRoutes;
