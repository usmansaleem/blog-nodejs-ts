import { IBlogItem } from "@entities";
import jsonfile from "jsonfile";
import path from "path";
import { logger } from "@shared";

export class BlogItemDao {
  private blogItems: IBlogItem[];
  private blogItemMap: Map<number, IBlogItem>;
  private readonly dataPath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "data.json"
  );

  constructor() {
    try {
      this.blogItems = this.loadBlogJson();
      this.blogItemMap = new Map<number, IBlogItem>(
        this.blogItems.map(b => [b.id, b] as [number, IBlogItem])
      );
      logger.info("Blog Items read: " + this.blogItems.length);
    } catch (err) {
      throw err;
    }
  }
  private loadBlogJson(): IBlogItem[] {
    return jsonfile.readFileSync(this.dataPath);
  }

  public getAll(): IBlogItem[] {
    return this.blogItems;
  }

  public async getById(id: number): Promise<IBlogItem> {
    return new Promise<IBlogItem>((resolve, reject) => {
      const blogItem = this.blogItemMap.get(id);
      if (blogItem) {
        return resolve(blogItem);
      } else {
        return reject(new Error("Blog Item not found"));
      }
    });
  }
}
