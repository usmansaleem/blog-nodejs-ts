import { logger } from "@shared";
import { Request, Response, Router, Express } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { paramMissingError } from "@shared";
import { ParamsDictionary } from "express-serve-static-core";
import { BlogItemDao } from "@daos";

// Init shared
const router = Router();
const blogItemDao = new BlogItemDao();

/******************************************************************************
 *                      Get All Users - "GET /rest/blog/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  try {
    const blogItem = blogItemDao.getAll();
    return res.status(OK).json({ blogItem });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *         Get Single BlogItem - "GET /rest/blog/blogItems/blogItem/:id"
 ******************************************************************************/

router.get('/blogItems/blogItem/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as ParamsDictionary;
        const blogItem = await blogItemDao.getById(Number(id));
        return res.status(OK).json( {blogItem});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
