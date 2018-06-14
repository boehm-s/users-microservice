import usersModel from './../models/users';


const create     = async ({email, password}) => await usersModel.create({email, password});
const getAll     = async _                   => await usersModel.getAll();
const getById    = async id                  => await usersModel.getBy({id});
const updateById = async (id, update)        => await usersModel.updateBy({id}, update);
const deleteById = async id                  => await usersModel.deleteBy({id});

export {create, getAll, getById, updateById, deleteById};
export default {create, getAll, getById, updateById, deleteById};
