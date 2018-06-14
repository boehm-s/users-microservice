import express	 from 'express';
import usersCtrl from './../controllers/users';

const usersRoutes = express.Router();

usersRoutes.route('/')
    .get(
	usersRoutes.getAll
    )
    .post(
	usersRoutes.create
    );

usersRoutes.route('/:id')
    .get(
	usersRoutes.getById
    )
    .put(
	usersRoutes.updateById
    )
    .delete(
	usersRoutes.deleteById
    );

export {usersRoutes};
export default usersRoutes;
