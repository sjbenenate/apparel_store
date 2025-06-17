import path from 'path';

export const JWT_COOKIE = 'obvious-overbill-preoccupy';

export const ACCESS_LEVELS = {
    ADMIN: 5,
    MAINTAINER: 3,
    BASIC: 0,
};

export const __DIRNAME = path.resolve();
export const UPLOADS_PATH = path.join(__DIRNAME, '/uploads');
