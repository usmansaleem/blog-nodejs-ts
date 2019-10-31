import { IBlogItem, BlogMeta } from "@entities";
import jsonfile from "jsonfile";
import path from "path";
import { logger } from "@shared";

export class BlogItemDao {
  private readonly BLOG_ITEMS_PER_PAGE: number = 10;
  private blogItems: IBlogItem[] = [];
  private blogItemMap: Map<string, IBlogItem> = new Map();
  private pagedBlogItemMap: Map<number, IBlogItem[]> = new Map();
  private blogItemByUrlMap: Map<string, IBlogItem> = new Map();

  private readonly dataPath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "data.json"
  );

  public initBlogItems(): void {
    try {
      this.blogItems = this.loadBlogJson();
      logger.info("Blog Items read: " + this.blogItems.length);
    } catch (err) {
      throw err;
    }

    // map by id
    this.blogItemMap = new Map(
      this.blogItems.map((blogItem) => {
        return [blogItem.id, blogItem] as [string, IBlogItem];
      })
    );

    // map by friendly_url
    this.blogItemByUrlMap = new Map<string, IBlogItem>(
      this.blogItems.map((blogItem) => {
        return [blogItem.urlFriendlyId, blogItem] as [string, IBlogItem];
      })
    );

    // map by page
    this.pagedBlogItemMap = this.buildPagedBlogItemMap(this.blogItems);
    logger.info("Blog pages created: " + this.pagedBlogItemMap.size);
  }

  private loadBlogJson(): IBlogItem[] {
    return jsonfile.readFileSync(this.dataPath);
  }

  // page 1 contains oldest blogItems, highest page contains latest items
  private buildPagedBlogItemMap(
    blogItems: IBlogItem[]
  ): Map<number, IBlogItem[]> {
    let startIdx: number = 0;
    let endIdx: number;
    let totalPagesCount: number;

    // calculate total pages count i.e. if we need more than 1 pages
    if (blogItems.length <= this.BLOG_ITEMS_PER_PAGE) {
      endIdx = blogItems.length;
      totalPagesCount = 1;
    } else {
      endIdx = this.BLOG_ITEMS_PER_PAGE;
      totalPagesCount = blogItems.length / this.BLOG_ITEMS_PER_PAGE;
      if (blogItems.length % this.BLOG_ITEMS_PER_PAGE > 0) {
        totalPagesCount++;
      }
    }

    // reverse sort copy of blogItems array based on blogItem.createdate
    const sortedBlogItems = [...blogItems].sort((left, right): number => {
      return right.createdOn.localeCompare(left.createdOn);
    });
    const pagedBlogItemMap = new Map<number, IBlogItem[]>();
    let pageNumber: number;
    for (pageNumber = 1; pageNumber <= totalPagesCount; pageNumber++) {
      pagedBlogItemMap.set(pageNumber, sortedBlogItems.slice(startIdx, endIdx));

      // update indexes for next page
      startIdx = endIdx;
      endIdx += this.BLOG_ITEMS_PER_PAGE;
      if (endIdx > blogItems.length) {
        endIdx = blogItems.length;
      }
    }

    return pagedBlogItemMap;
  }

  public getBlogMeta(): BlogMeta {
    return new BlogMeta(this.pagedBlogItemMap.size, this.blogItems.length);
  }

  public getAll(): IBlogItem[] {
    return [...this.blogItems];
  }

  public async getById(id: string): Promise<IBlogItem> {
    return new Promise<IBlogItem>((resolve, reject) => {
      const blogItem = this.blogItemMap.get(id);
      if (blogItem) {
        return resolve(blogItem);
      } else {
        return reject(new Error("Blog not found"));
      }
    });
  }

  public async getByPageId(pageId: number): Promise<IBlogItem[]> {
    return new Promise<IBlogItem[]>((resolve, reject) => {
      const blogItems = this.pagedBlogItemMap.get(pageId);
      if (blogItems) {
        return resolve(blogItems);
      } else {
        return reject(new Error("Page not found"));
      }
    });
  }

  public async getByUrlFriendlyId(urlFriendlyId: string): Promise<IBlogItem> {
    return new Promise<IBlogItem>((resolve, reject) => {
      const blogItem = this.blogItemByUrlMap.get(urlFriendlyId);
      if (blogItem) {
        return resolve(blogItem);
      } else {
        return reject(new Error("Blog not found"));
      }
    });
  }
}
