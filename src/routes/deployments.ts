import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';
import models from "../models";


// Init shared
const router = Router();


router.get('/', async (req: Request, res: Response) => {
    const deployments = await models.Deployment.find().sort({ deployedAt: -1 });
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
    let deployment = new models.Deployment({ templateName, version, url, deployedAt: new Date()});
    deployment = await deployment.save();
    console.log('deployment', deployment);
    return res.status(CREATED).json(deployment);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const result = await models.Deployment.deleteOne({ _id: req.params.id });
    console.log('delete', result);
    return res.status(OK).json(result.deletedCount === 1);
});

export default router;
