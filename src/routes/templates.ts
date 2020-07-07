import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';
import models from "../models";


// Init shared
const router = Router();
const userDao = new UserDao();


router.get('/', async (req: Request, res: Response) => {
    const templates = await models.Template.find();
    return res.status(OK).json(templates);
    // const users = await userDao.getAll();
    // return res.status(OK).json({users});
});


export default router;
