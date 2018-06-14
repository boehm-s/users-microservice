import Bookshelf		from '../../config/db';

module.exports = Bookshelf.Model.extend({
    tableName: '',
    hidden: ['password'],
    async update(body) {
        this.set(body);
        return await this.save();
    }
}, {
    async create(body) {
    },

    async getAll() {
    },

    async getBy(filter) {
    },

    async getById(id) {
    },

    async updateBy(filter, update) {
    },

    async updateById(id, update) {
    },

    async deleteBy(filter) {
    },

    async deleteById(id) {
    }
});
