import { Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';

import models from "../models";

// Init shared
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const templates = await models.Template.find();
    return res.status(OK).json(templates);
});

export default router;
