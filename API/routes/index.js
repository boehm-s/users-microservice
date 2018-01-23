import express				from 'express';
import {usersRoutes}			from './users';
import {forecastRoutes}			from './forecast';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/users', usersRoutes);
router.use('/forecast', forecastRoutes);


export default router;
