import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';

import { paramMissingError } from '@shared/constants';
import models from "../models";


// Init shared
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const deployments = await models.Deployment.find().sort({ deployedAt: -1 });
    return res.status(OK).json(deployments);
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
    return res.status(OK).json(deployment);
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await models.Deployment.deleteOne({ _id: req.params.id });
        console.log('delete', result);
        return res.status(OK).json(result.deletedCount === 1);
    } catch (e) {
        return res.status(BAD_REQUEST).json({ error: e.toString() });
    }
});

export default router;
