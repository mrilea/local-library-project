function findAccountById(accounts, id) {
  const found = accounts.find((accounts) => accounts.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  const sorted = accounts.sort((a, b) =>
    a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1
  );
  return sorted;
}

function getTotalNumberOfBorrows(account, books) {
  const userId = account.id;
  let result = 0;
  for (let i = 0; i < books.length; i++) {
    const test = books[i].borrows;
    for (let j = 0; j < test.length; j++) {
      const bookId = test[j].id;
      if (bookId === userId) {
        result++;
      }
    }
  }
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
  let borrowMatch = [];
  books.forEach((item) => {
   const borrowed = item.borrows;
   const book = {
    id: item.id,
    title: item.title,
    genre: item.genre,
    authorId: item.authorId,
    author: {},
    borrows: {}
   };
   const { id, title, genre, authorId, author, borrows } = book;
 
   borrowed.forEach((borrow) => {
    if (borrow.id === account.id && borrow.returned === false) {
     result.push(book);
     borrowMatch.push(borrow);
     book.borrows = borrowMatch;
     book.author = authors.filter((auth) => auth.id === book.authorId)[0];
    }
   });
  });
  return result;
 }

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
