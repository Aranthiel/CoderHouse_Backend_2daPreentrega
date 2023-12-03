import {Router} from 'express';


const viewsRouter = Router();

viewsRouter.get("*", async (req, res) => {
    res.status(404).render('error', {
        status: 'error',
        message: 'viewsRouter not found.',
        data: {}
    });
});

export default viewsRouter;