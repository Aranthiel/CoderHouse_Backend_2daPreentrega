import {Router} from 'express';


const errorRouter = Router();

errorRouter.get("*", async (req, res) => {
    res.status(404).render('error', {
        status: 'error',
        message: 'errorRoute not found.',
        data: {}
    });
});

export default errorRouter;