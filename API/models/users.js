import Bookshelf		from '../../config/db';
import roleModel		from './role';

module.exports = Bookshelf.Model.extend({
    tableName: 'users',
    hidden: ['password'],
    linkedRole() {
        return this.hasOne(roleModel, 'id', 'role');
    },
    linkedAdwords() {
	return this.hasOne(usersAdwordsModel, 'id', 'adwords_info');
    },
    linkedAdwordsManager() {
	return this.belongsTo(managersAdwordsModel, 'manager');
    },
    async update(body) {
        this.set(body);
        return await this.save();
    }
}, {
    async create(body) {
	// fill user adwords info
        return await (await new this(body).save()).fetch({
	    withRelated: ['linkedRole', 'linkedAdwords', 'linkedAdwordsManager']
	});
    },

    async getAll() {
        return await this.fetchAll({
	    withRelated: ['linkedRole', 'linkedAdwords', 'linkedAdwordsManager']
	});
    },

    async getBy(filter) {
	return await this
	    .query({where: filter})
	    .fetch({
		withRelated: ['linkedRole', 'linkedAdwords', 'linkedAdwordsManager']
	    });
    },

    async getById(id) {
        return await this.getBy({id});
    },

    async updateBy(filter, update) {
	return await (await this
		      .query({where: filter})
		      .save(update, {patch: true}))
	    .fetch({
		withRelated: ['linkedRole', 'linkedAdwords', 'linkedAdwordsManager']
	    });
    },

    async updateById(id, update) {
	return await this.updateBy({id}, update);
    },

    async deleteBy(filter) {
	return await this.query({where: filter}).destroy();
    },

    async deleteById(id) {
	return await this.deleteBy({id});
    }
});
