const access = (roles, exception = null) => (req, res, next) => {
    if (!req.hasOwnProperty('user') || !req.isAuthenticated())
	return res.status(401).end('Unauthorized');

    if (null !== exception) { // could be shorter
	const exceptionRet = exception(req);

	if (!exceptionRet.success && !roles.includes(req.user.role))
	    return res.status(403).end('Forbidden');

	req = exceptionRet.req ? exceptionRet.req : req;  // eslint-disable-line no-param-reassign

	return next();
    }

    return roles.includes(req.user.role)
	? next()
	: res.status(403).end('Forbidden');
};

export {access};
export default access;
