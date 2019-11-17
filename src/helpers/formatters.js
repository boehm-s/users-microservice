const user = user => ({
    id: user.id,
    email: user.email,
    role: user.role.authority
});

export default {user};
