import { BlogItemDao } from "./BlogItem/BlogItemDao";

// initialize and export singelton dao
const blogItemDao = new BlogItemDao();
blogItemDao.initBlogItems();

export { blogItemDao };
