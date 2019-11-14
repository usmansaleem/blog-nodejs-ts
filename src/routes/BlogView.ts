import { logger } from "@shared";
import { Request, Response, Router, Express } from "express";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes";
import { ParamsDictionary } from "express-serve-static-core";
import { blogItemDao } from "@daos";
import { BlogItemDate } from "@entities";

// Init shared
const router = Router();

/******************************************************************************
 *          List of all articles anchor links - "GET /view/list"
 ******************************************************************************/

router.get("/list", async (req: Request, res: Response) => {
    try {
      const blogItems = blogItemDao.getAll();
      res.status(OK);
      res.render("list", { blogItems });
    } catch (err) {
      logger.error(err.message, err);
      res.status(NOT_FOUND);
      res.render("error", { message: err.message, error: {} });
    }
  });

/******************************************************************************
 *          Get Blog Page rendered - "GET /view/blog/:urlFriendlyId"
 ******************************************************************************/

router.get("/blog/:urlFriendlyId", async (req: Request, res: Response) => {
  try {
    const { urlFriendlyId } = req.params as ParamsDictionary;
    logger.info("Friendly URL: " + urlFriendlyId);
    const blogItem = await blogItemDao.getByUrlFriendlyId(urlFriendlyId);
    const blogItemDate = new BlogItemDate(blogItem.createdOn);
    res.status(OK);
    res.render("blog", { blogItem, blogItemDate });
  } catch (err) {
    logger.error(err.message, err);
    res.status(NOT_FOUND);
    res.render("error", { message: err.message, error: {} });
  }
});

export default router;
