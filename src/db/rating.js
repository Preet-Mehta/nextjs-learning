import Rating from "@/models/rating";

export async function getRatingsForBook(book_id) {
  try {
    const result = await Rating.aggregate()
      .match({ book_id: Number(book_id) })
      .group({
        _id: "book_id",
        count: { $sum: 1 },
        average: { $avg: "$rating" },
      });
    const { count, average } = result[0];
    return { count, average };
  } catch (error) {
    console.log(
      `Could not fetch ratings data for book_id: ${book_id}. Error: ${error}`
    );
    return { count: 0, average: 0 };
  }
}

export async function createRating(ratingParams) {
  const { book_id, rating } = ratingParams;

  try {
    return await Rating.create({
      book_id: Number(book_id),
      rating: Number(rating),
    });
  } catch (error) {
    console.log(
      `Could not create new rating for book_id: ${book_id}. Error: ${error}`
    );
  }
}
