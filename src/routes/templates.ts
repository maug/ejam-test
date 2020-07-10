import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';

import models from "../models";

// Init shared
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const templates = await models.getTemplates();
        return res.status(OK).json(templates);
    } catch (e) {
        return res.status(BAD_REQUEST).json({ error: e.toString() });
    }
});

export default router;
