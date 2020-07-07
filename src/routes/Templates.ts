import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError } from '@shared/constants';
import models from "../models";


// Init shared
const router = Router();
const userDao = new UserDao();

// import mongoose, { Document, Model, Schema } from 'mongoose';
//
// const mongoUri = 'mongodb+srv://ejam:sonar-malapert-purr@ejam.kmysw.mongodb.net/ejam?retryWrites=true&w=majority';
// mongoose.connect(mongoUri, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB Connection error'));
//
// const kittySchema = new mongoose.Schema({
//     name: String
// });
// kittySchema.methods.speak = function () {
//     const greeting = this.name
//       ? "Meow name is " + this.name
//       : "I don't have a name";
//     console.log(greeting);
// }
// const Kitten = mongoose.model('Kitten', kittySchema);
// const fluffy = new Kitten({ name: 'fluffy' });
// fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
// });
//
// const templateSchema = new Schema({
//     name: String,
//     versions: [String],
// });
// interface TemplateProps extends Document {
//     name: string,
//     versions: string[],
// }
// const Template: Model<TemplateProps> = mongoose.model('Template', templateSchema, 'templates');
// Template.find(function (err, templates) {
//     if (err) return console.error(err);
//     console.log(templates);
// })


/******************************************************************************
 *                      Get All Templates - "GET /api/templates/all"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    const templates = await models.Template.find();
    return res.status(OK).json(templates);
    // const users = await userDao.getAll();
    // return res.status(OK).json({users});
});


export default router;
