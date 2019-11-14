import { Category, ICategory } from "./Category";
import moment from "moment";

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
    id: string,
    urlFriendlyId: string,
    title: string,
    description: string,
    body: string,
    blogSection: string,
    createdOn: string,
    modifiedOn: string,
    // createDay: string,
    // createMonth: string,
    // createYear: string,
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

export class BlogItemDate {
  public readonly weekday: string;
  public readonly day: string;
  public readonly month: string;
  public readonly year: string;

  constructor(createdDate: string) {
   var parsedDate = moment(createdDate);
   this.weekday = parsedDate.format("dddd");
   this.day = parsedDate.format("D");
   this.month = parsedDate.format("MMMM");
   this.year = parsedDate.format("Y") ;  
  }
}
