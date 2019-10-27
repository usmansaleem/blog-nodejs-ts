import app from "@server";
import supertest from "supertest";

import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { Response, SuperTest, Test } from "supertest";
import { IBlogItem, BlogItem } from "@entities";
import { BlogItemDao } from "@daos";
import { pErr, paramMissingError } from "@shared";

describe("Blog Routes", () => {
  const blogPath = "/rest/blog";
  const getAllBlogItemsPath = `${blogPath}/all`;

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
});
