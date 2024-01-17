import express from 'express';
import { habitController } from '../controller/home_controller.js';

const user = express.Router();

// For rendering different pages and controllers
user.get('/', habitController.load);
user.post('/add-habit', habitController.add);
user.get('/delete-habit', habitController.delete);
user.get('/view-habit', habitController.viewhabit);
user.get('/find-habit', habitController.fetchhabit);
user.get('/update-db-date', habitController.updateDates);

export default user;
