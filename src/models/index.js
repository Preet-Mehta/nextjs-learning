import { Book } from "./book.js";
import { Author } from "./author.js";

Author.hasMany(Book, { foreignKey: "author_id" });
Book.belongsTo(Author, { foreignKey: "author_id" }); // Need to add foreignKey here as well

const models = { Book, Author };
export default models;
