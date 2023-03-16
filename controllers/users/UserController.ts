import {Express, Request, Response} from "express";
import UserDao from "../../daos/users/UserDao";
import UserControllerI from "../../interfaces/UserControllerI";

export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/users', UserController.userController.findAllUsers);
            app.get('/users/:uid', UserController.userController.findUserById);
            app.post('/users', UserController.userController.createUser);
            //app.post('/login', UserController.userController.login);
            //app.post('/register', UserController.userController.register);
            app.delete('/users/:uid', UserController.userController.deleteUser);
            app.put('/users/:uid', UserController.userController.updateUser);
        }
        return UserController.userController;
    }

    private constructor() {
    }

    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then(user => res.json(user));

    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then(status => res.json(status));

    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then(status => res.json(status));

    login = (req: Request, res: Response) =>
        UserController.userDao.findUserByCredentials(req.body.email, req.body.password)
            .then(user => res.json(user));

    register = (req: Request, res: Response) =>
        UserController.userDao.findUserByEmail(req.body.email)
            .then(user => res.json(user));
}