import _redis from 'redis';
const redis = _redis.createClient();

redis.on('error', err => {
    throw new Error((`Error ${err}`));
});

export default redis;
// we don't use it for the moment
