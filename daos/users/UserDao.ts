import UserModel from "../../mongoose/users/UserModel";
import User from "../../models/users/User";
import UserDaoI from "../../interfaces/UserDaoI";

export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {}

    findAllUsers = async (): Promise<User[]> =>
        UserModel.find().exec();

    findUserById = async (uid: string): Promise<any> =>
        UserModel.findById(uid);

    createUser = async (user: User): Promise<User> =>
        UserModel.create(user);

    updateUser = async (uid: string, user: User): Promise<any> =>
        UserModel.updateOne(
            {_id: uid},
            {$set: user}
        );

    deleteUser = async (uid: string): Promise<any> =>
        UserModel.deleteOne({_id: uid});

    findUserByCredentials = async (email: string, password: string): Promise<any> =>
        UserModel.findOne({email: email, password: password});

    findUserByEmail = async (email: string): Promise<any> =>
        UserModel.findOne({email: email});

    deleteUserByEmail = async (email: string): Promise<any> =>
        UserModel.deleteMany({email: email})
}