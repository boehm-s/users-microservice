/* eslint-disable camelcase */
import _		from 'lodash';

const meException = req => {
    if (req.hasOwnProperty('user') && ('me' === req.params.id || req.user.id === req.params.id)) {
	req.params.id = 'me' === req.params.id ? req.user.id : req.params.id;
	return {success: true, req};
    } else {
	return {success: false};
    }
};

/* `req.user` before `buildUser` :
{
  id: xx,
  email: 'xxx@mail.net',
  password: '$8w$36$/a6sf87dsa3/sYM42Huwd6AwHmFxxxxZpEfgxxxxyfWYTpd9UeG',
  role: 1,
  name: 'test user',
  manager: 1,
  adwords_info: 8,
  linkedRole: {
    id: 1,
    name: 'user'
  },
  linkedAdwordsManager: {
     id: 1,
     user_id: 1,
     oauth_client_id: '424242424242-lp06q8bxxxxxxxifduq3gmjxxxxo30re.apps.googleusercontent.com',
     oauth_client_secret: '12asd684asd384as86fd7s42',
     oauth_refresh_token: '7/xxxxxxx_VyZ7DMU42424241JVNux0QeHkJyyaxxxxo',
     developer_token: 'xxx42xx_1VMsxxxxxxYxrA'
  },
  linkedAdwords: {
    id: 8,
    customer_id: '4264270426',
    user_agent: 'dontcare'
  }
}
*/

const buildUser = (user, filter = ['id', 'name', 'email', 'role', 'manager', 'customer_id', 'marge']) =>
	  _.pick({
	      ...user,
	      role: user.linkedRole.name,
	      customer_id: user.linkedAdwords.customer_id
	  }, filter);

export {meException, buildUser};
