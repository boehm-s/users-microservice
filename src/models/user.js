import _            from 'lodash';
import bcrypt       from 'bcrypt';
import Bookshelf    from '../config/bookshelf';
import fmt          from '../helpers/formatters';

const SALT_ROUNDS = 10;

var User = Bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'id',
    hidden: ['password'],

    async update(body) {
        const realbody = _.pick(body, ['email', 'password']);

        if (realbody.password) {
            realbody.password = await bcrypt.hash(realbody.password, SALT_ROUNDS);
        }

        if (body.role) {
            realbody.role_id = body.role;
        }

        const _user = await this.save(realbody, {patch: true});
        const updatedUser = await _user.fetch({withRelated: ['role']});

        return fmt.user(updatedUser.toJSON());
    },
    async delete() {
        return await this.destroy();
    }
}, {
    async getAll() {
        const usersList = await this.query({}).fetchAll({withRelated: []});

        return usersList
              .map(user => user.toJSON())
              .map(fmt.user);
    },

    async create(body) {
        const realbody = _.pick(body, ['email', 'password']);

        realbody.password = await bcrypt.hash(realbody.password, SALT_ROUNDS);

        const user = await (await new this(realbody).save()).fetch({withRelated: []});

        return fmt.user(user.toJSON());
    },
    async delete(id) {
        try {
            var destroy = await new this({id}).destroy({require: true});
        } catch (e) {
            return false;
        }
        return true;
    }
});

module.exports = Bookshelf.model('User', User);
