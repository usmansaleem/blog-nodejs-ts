import { Category, ICategory } from "./Category";

export interface IBlogItem {
  id?: string;
  urlFriendlyId: string;
  title: string;
  description: string;
  body: string;
  blogSection: string;
  readonly createdOn: string;
  readonly createDay: string;
  readonly createMonth: string;
  readonly createYear: string;
  modifiedOn: string;
  categories: ICategory[];
}

export class BlogItem implements IBlogItem {
  public id?: string | undefined;
  public urlFriendlyId: string;
  public title: string;
  public description: string;
  public body: string;
  public blogSection: string;
  public readonly createdOn: string;
  public modifiedOn: string;
  public readonly createDay: string;
  public readonly createMonth: string;
  public readonly createYear: string;
  public categories: ICategory[];

  constructor(
    id: string,
    urlFriendlyId: string,
    title: string,
    description: string,
    body: string,
    blogSection: string,
    createdOn: string,
    modifiedOn: string,
    createDay: string,
    createMonth: string,
    createYear: string,
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
    this.createDay = createDay;
    this.createMonth = createMonth;
    this.createYear = createYear;
    this.categories = categories;
  }
}
