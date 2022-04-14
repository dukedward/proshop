import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Edward Gregory',
        email: 'egregory@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Rebecca Ratliff',
        email: 'rratliff@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Michael Gregory',
        email: 'mgregory@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users
