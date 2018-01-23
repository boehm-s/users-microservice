/* eslint-disable camelcase */
import jwt                      from 'jsonwebtoken';
import usersModel               from './../models/users';
import adwordsModel             from './../models/adwords';
import usersAdwordsModel	from './../models/usersAdwordsInfo';
import {buildUser}              from './../helpers/users';
import {conf}                   from './../../config/passport';

const create = async (req, res, next) => {
    try {
	/* create the user in adwords and get his customer_id */
	const _adwordsUser = await adwordsModel.createUser(req.adwordsConf, {
	    name: req.body.name,
	    creator_customer_id: req.user.customer_id
	});
	const adwordsUser = _adwordsUser.value[0];

        /* add the customer_id to the database */
        const _adwordsInfo = await usersAdwordsModel.create({customer_id: adwordsUser.customerId});
	const adwordsInfo = _adwordsInfo.toJSON();

        var createdUser = await usersModel.create({
	    ...req.body,
	    adwords_info: adwordsInfo.id,
	    manager: req.user.id  /* the current user should be the manager */
	});
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

        /* delete (hide) users in adwords */



        /* delete the user */
	await usersModel.deleteById(req.params.id);

        /* delete user linked adwords data */
        await usersAdwordsModel.deleteById(user.linkedAdwords.id);

        /* if user is manager, delete manager linked adwords data  TODO? (Not implemented yet) */

        // await adwordsModel.delete(req.adwordsConf, {
        //     customer_id
        // });

    } catch (e) {
	return next(e);
    }

    return res.json({deleted: true});
};

export default {create, getAll, getById, updateById, deleteById};
