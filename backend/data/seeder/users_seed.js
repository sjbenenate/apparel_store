import bcrypt from 'bcryptjs';
import { ACCESS_LEVELS } from '../../constants.js';

const users = [
    {
        name: 'Admin',
        email: 'admin@mail.com',
        password: bcrypt.hashSync('123456', 10),
        accessLevel: ACCESS_LEVELS.ADMIN,
    },
    {
        name: 'Charlie Brown',
        email: 'charlie@mail.com',
        password: bcrypt.hashSync('123456', 10),
        accessLevel: ACCESS_LEVELS.BASIC,
    },
    {
        name: 'Lucy Lue',
        email: 'lucy@mail.com',
        password: bcrypt.hashSync('123456', 10),
        accessLevel: ACCESS_LEVELS.BASIC,
    },
];

export default users;
