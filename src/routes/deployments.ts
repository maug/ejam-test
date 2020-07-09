import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';
import models from "../models";


// Init shared
const router = Router();


router.get('/', async (req: Request, res: Response) => {
    const deployments = await models.Deployment.find();
    return res.status(OK).json(deployments);
    // const users = await userDao.getAll();
    // return res.status(OK).json({users});
});


router.post('/', async (req: Request, res: Response) => {
    const { templateName, version, url } = req.body;
    if (!templateName || !version || !url ) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const ala = new models.Deployment({ templateName, version, url, deployedAt: new Date()});
    console.log('ala', ala);
    const dupa = await ala.save();
    console.log('dupa', dupa);
    return res.status(CREATED).json(dupa);
});

export default router;
