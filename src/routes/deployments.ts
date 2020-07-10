import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';

import { paramMissingError } from '@shared/constants';
import models from "../models";


// Init shared
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const deployments = await models.getDeployments();
        return res.status(OK).json(deployments);
    } catch (e) {
        return res.status(BAD_REQUEST).json({ error: e.toString() });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { templateName, version, url } = req.body;
        if (!templateName || !version || !url ) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        const deployment = await models.addDeployment({ templateName, version, url });
        console.log('deployment', deployment);
        return res.status(OK).json(deployment);
    } catch (e) {
        return res.status(BAD_REQUEST).json({ error: e.toString() });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const hasBeenDeleted = await models.deleteDeployment(req.params.id);
        return res.status(OK).json(hasBeenDeleted);
    } catch (e) {
        return res.status(BAD_REQUEST).json({ error: e.toString() });
    }
});

export default router;
