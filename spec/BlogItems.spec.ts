import app from "@server";
import supertest from "supertest";

import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { Response, SuperTest, Test } from "supertest";
import { IBlogItem, BlogItem } from "@entities";
import { pErr, paramMissingError } from "@shared";

describe("Blog Routes", () => {
  const blogPath = "/rest/blog";
  const getAllBlogItemsPath = `${blogPath}/all`;
  const getByPageId = `${blogPath}/blogItems/:pageId`;

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
});
