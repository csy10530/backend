import User from "../models/users/User";

export default interface UserDaoI {
    findAllUsers(): Promise<User[]>;

    findUserById(uid: string): Promise<User>;

    createUser(user: User): Promise<User>;

    updateUser(uid: string, user: User): Promise<any>;

    deleteUser(uid: string): Promise<any>;

    findUserByCredentials(email: string, password: string): Promise<any>;

    findUserByEmail(email: string): Promise<any>;

    deleteUserByEmail(email: string): Promise<any>;
}