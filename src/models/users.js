import Bookshelf from './../config/db';

module.exports = Bookshelf.Model.extend({
    tableName: 'users',
    hidden: ['password'],
    async update(body) {
        this.set(body);
        return await this.save();
    }
}, {

    async create(body) {
	return await (await new this(body).save()).fetch();
    },

    async getAll() {
        return await this.fetchAll();
    },

    async getBy(filter) {
        return await this.query({where: filter}).fetch();
    },

    async updateBy(filter, update) {
	return await (await this.where(filter).fetch()).update(update);
    },

    async deleteBy(filter) {
	return await new this(filter).destroy();
    }
});
