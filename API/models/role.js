import Bookshelf    from '../../config/db';

module.exports = Bookshelf.Model.extend({
    tableName: 'roles',
    async update(body) {
        this.set(body);
        return await this.save();
    }
}, {
    async create(body) {
        return await (await new this(body).save()).fetch();
    },

    async getBy(filter) {
        return await this.query({where: filter}).fetch();
    },

    async getById(id) {
        return await this.query({where: {id}}).fetch();
    },

    async getAll() {
        return await this.fetchAll();
    }
});
