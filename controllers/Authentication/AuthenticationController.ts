import {Express, Request, Response} from "express";
import UserDao from "../../daos/users/UserDao";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const AuthenticationController = (app: Express) => {
    const userDao: UserDao = UserDao.getInstance();

    const login = async (req: Request, res: Response) => {
        const user = req.body;
        const password = user.password;
        const email = user.email;

        const existingUser = await userDao.findUserByEmail(email);
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }
        const match = await bcrypt.compare(password, existingUser.password);
        if (match) {
            existingUser.password = "*****";
            /*req.session["profile"] = existingUser;
            req.session["authenticated"] = true;*/
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }

    const register = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        newUser.password = await bcrypt.hash(password, saltRounds);

        const existingUser = await userDao.findUserByEmail(req.body.email);
        if (existingUser) {
            console.log(existingUser)
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao.createUser(newUser);
            insertedUser.password = "";
            //req.session["profile"] = insertedUser;
            //req.session["authenticated"] = true;
            res.json(insertedUser);
        }
    }

    const profile = (req: Request, res: Response) => {
        //const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    const logout = (req: Request, res: Response) => {
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/login", login);
    app.post("/api/register", register);
    app.post("/api/profile", profile);
    app.post("/api/logout", logout);
}

export default AuthenticationController;