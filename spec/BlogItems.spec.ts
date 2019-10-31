import app from "@server";
import supertest from "supertest";

import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { Response, SuperTest, Test } from "supertest";
import { IBlogItem, BlogItem } from "@entities";
import { pErr, paramMissingError, logger } from "@shared";

describe("Blog Routes", () => {
  const blogPath = "/rest/blog";
  const getAllBlogItemsPath = `${blogPath}/all`;
  const getByPageId = `${blogPath}/blogItems/:pageId`;
  const getById = `${blogPath}/blogItems/blogItem/:id`;

  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  describe(`"GET:${getAllBlogItemsPath}"`, () => {
    it(`should return a JSON object with all the blogItems and a status code of "${OK}" if the
        request was successful.`, (done) => {
      agent.get(getAllBlogItemsPath).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.body.error).toBeUndefined();
        const blogItems: IBlogItem[] = res.body;
        expect(blogItems.length).toBeGreaterThan(1);
        done();
      });
    });
  });

  describe(`"GET: ${getByPageId}"`, () => {
    const callApi = (pageId: number) => {
      return agent.get(getByPageId.replace(":pageId", pageId.toString()));
    };

    it("should return blogItems per page", (done) => {
      callApi(1).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.body.error).toBeUndefined();
        const blogItems: IBlogItem[] = res.body;
        expect(blogItems.length).toBeGreaterThan(1);
        done();
      });
    });

    it(`"should return ${BAD_REQUEST} if page doesn't exist"`, (done) => {
      callApi(0).end((err: Error, res: Response) => {
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe("Page not found");
        done();
      });
    });
  });

  describe(`"GET: ${getById}"`, () => {
    const callApi = (id: string) => {
      return agent.get(getById.replace(":id", id));
    };

    it("should return valid blogItem", (done) => {
      callApi("1").end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.body.error).toBeUndefined();
        logger.info("**** " + JSON.stringify(res.body));
        const blogItems: IBlogItem = res.body;
        expect(blogItems.id).toBe("1");
        logger.info("created on Day: " + blogItems.createdOn);
        done();
      });
    });

    it(`"should return ${BAD_REQUEST} if blogItem doesn't exist"`, (done) => {
      callApi("0").end((err: Error, res: Response) => {
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe("Blog not found");
        done();
      });
    });
  });
});
