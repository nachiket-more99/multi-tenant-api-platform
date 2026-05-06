export const getBooksService = async () => {
  res.status(200).json({
    books: [
      { id: 1, title: "The Pragmatic Programmer", author: "Andy Hunt" },
      { id: 2, title: "Clean Code", author: "Robert Martin" },
      { id: 3, title: "System Design Interview", author: "Alex Xu" },
    ]
  });
};