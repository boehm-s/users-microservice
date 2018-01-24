/* eslint-disable camelcase */
import jwt                      from 'jsonwebtoken';
import usersModel               from './../models/users';
import {buildUser}              from './../helpers/users';
import {conf}                   from './../../config/passport';

const create = async (req, res, next) => {
    try {
        var createdUser = await usersModel.create(req.body);
    } catch (e) {
        return next(e);
    }

    const user = buildUser(createdUser.toJSON());

    jwt.sign({data: user}, conf.secret, { expiresIn: 60 * 60 * 24 * 31});

    return res.json(user);
};

const getAll = async (req, res, next) => {
    try {
	const  allUsers = await usersModel.getAll();
	var ret = allUsers.toJSON()
	    .map(user => buildUser(user));
    } catch (e) {
	return next(e);
    }

    return res.json(ret);
};

const getById = async (req, res, next) => {
    try {
	var user = await usersModel.getById(req.params.id);
    } catch (e) {
	return next(e);
    }

    return res.json(buildUser(user.toJSON()));
};

const updateById = async (req, res, next) => {
    try {
	var updatedUsers = await usersModel.updateById(req.params.id, req.body);
    } catch (e) {
	return next(e);
    }

    return res.json(buildUser(updatedUsers.toJSON()));
};

const deleteById = async (req, res, next) => {
    try {
        const user = (await usersModel.getById(req.params.id)).toJSON();

	await usersModel.deleteById(req.params.id);
    } catch (e) {
	return next(e);
    }

    return res.json({deleted: true});
};

export default {create, getAll, getById, updateById, deleteById};
