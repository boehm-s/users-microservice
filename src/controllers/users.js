import usersService from './../services/users';


const create = async userBody => {
    const user = await usersService.create(userBody);

    return user.toJSON();
};

const getAll = async _ => {
    const users = await usersService.getAll();

    return users.toJSON();
};

const getById = async userId => {
    const user = await usersService.getById(userId);

    return user.toJSON();
};

const updateById = async userId => {
    const user = await usersService.updateById(userId);

    return user.toJSON();
};

const deleteById = async userId => {
    const user = await usersService.deleteById(userId);

    return user.toJSON();
};

export default {create, getAll, getById, updateById, deleteById};
