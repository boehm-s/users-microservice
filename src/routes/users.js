import express  from 'express';

const router = express.Router();

const notImplemented = (req, res) => res.end('Not Implemented Yet');


router.route('/')
    .get(notImplemented)
    .post(notImplemented);

export default router;
