import UserDao from "../daos/users/UserDao";
import User from "../models/users/User";

const userDao: UserDao = UserDao.getInstance();


export const login = async (u: string, p: string) => {
    try {
        const user = await userDao.findUserByCredentials(u, p);
        if (!user) {
            throw "Unknown user";
        }
        return user;
    } catch (e) {
        return e;
    }
}

export const register = async (f: string, l: string, p: string, e: string) => {
    try {
        const user = await userDao.findUserByEmail(e);
        if (user) {
            throw 'User already exists';
        }
        return await userDao.createUser({firstName: f, lastName: l, password: p, email: e});
    } catch (e) {
        return e;
    }
}