import { Category, ICategory } from "./Category";

export class BlogItem {
  public id?: string | undefined;
  public urlFriendlyId: string;
  public title: string;
  public description: string;
  public body: string;
  public blogSection: string;
  public readonly createdOn: string;
  public modifiedOn: string;

  public categories: ICategory[];

  constructor(
    id: string | undefined,
    urlFriendlyId: string,
    title: string,
    description: string,
    body: string,
    blogSection: string,
    createdOn: string,
    modifiedOn: string,
    categories: ICategory[]
  ) {
    this.id = id;
    this.urlFriendlyId = urlFriendlyId;
    this.title = title;
    this.description = description;
    this.body = body;
    this.blogSection = blogSection;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;

    this.categories = categories;
  }
}
