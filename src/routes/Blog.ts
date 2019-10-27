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
 *                      Get All Blog Items - "GET /rest/blog/all"
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
 *                      Get Blog MetaData - "GET /rest/blog/blogMeta"
 ******************************************************************************/

router.get("/blogMeta", async (req: Request, res: Response) => {
  try {
    const blogMeta = blogItemDao.getBlogMeta();
    return res.status(OK).json({ blogMeta });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *         Get BlogItems Per Page - "GET /rest/blog/blogItems/:pageId"
 ******************************************************************************/

router.get("/blogItems/:pageId", async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params as ParamsDictionary;
    const blogItem = await blogItemDao.getByPageId(Number(pageId));
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

router.get("/blogItems/blogItem/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params as ParamsDictionary;
    const blogItem = await blogItemDao.getById(Number(id));
    return res.status(OK).json({ blogItem });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
