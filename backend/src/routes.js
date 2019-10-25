import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import RegistrationController from './app/controllers/RegistrationController';
import OrganizationController from './app/controllers/OrganizationController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateMeetupStore from './app/validators/MeetupStore';
import validateMeetupUpdate from './app/validators/MeetupUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validateMeetupStore, MeetupController.store);
routes.put('/meetups', validateMeetupUpdate, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);
routes.get('/meetups/:id', MeetupController.show);

routes.get('/organization/', OrganizationController.index);

routes.get('/registrations/', RegistrationController.index);
routes.delete('/registrations/:id', RegistrationController.delete);

routes.post('/meetups/:meetupId/registration', RegistrationController.store);

routes.put('/users', validateUserUpdate, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files/:id', FileController.index);

export default routes;
