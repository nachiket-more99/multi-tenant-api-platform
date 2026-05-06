import { getBooksService } from "./books.service.js";

export const getBooks = async (req, res) => {
  try {
    const books = await getBooksService();
    res.status(200).json({ "books": books });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};