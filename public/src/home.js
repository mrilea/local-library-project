function getTotalBooksCount(books) {
  let result = books.length;
  return result;
}

function getTotalAccountsCount(accounts) {
  let result = accounts.length;
  return result;
}

function getBooksBorrowedCount(books) {
  let result = books.reduce((step, book) => step + !book.borrows[0].returned, 0);
  return result;
}

function getMostCommonGenres(books) {
  //create an object to store book genres as key, with count as value
  let map = {};
  //use forEach to loop through the books obj
  books.forEach((num) => {
    //if there is a key with the genre name increase its value by 1
   if (map[num.genre]) {
    map[num.genre]++;
   } else {
     //if the key is missing, add the key and set the count to 1
    map[num.genre] = 1;
   }
  });
  //use Object.entries on the map obj. to return arrays with the key, value pairs
  return Object.entries(map)
   .map(([name, count]) => {
    return {
     name,
     count
    };
   })
   //sort the array genres with the highest count first to lowest last, then use slice to limit to 5 indexs
   .sort((a, b) => b.count - a.count).slice(0, 5);
 }

function getMostPopularBooks(books) {
  //use map to loop through the books
  let result = books.map((book) => {
    //store the book title with the key 'name' and set the count to the number of times the book was borrowed
    return { name: book.title, count: book.borrows.length };
    //sort the list from highest count to lowest, then slice to only show the first 5 indexs
  }).sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 5);
  return result;
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  //use forEach to loop through the authors
  authors.forEach((author) => {
    // creat object theAuthor with author name and set count to 0
    let theAuthor = {
    name: `${author.name.first} ${author.name.last}`,
    count: 0
  };
  //use forEach to loop through each book in books
  books.forEach((book) => {
    //check book author vs authors
    if (book.authorId === author.id) {
      //update count value to the number of borrows for this book
      theAuthor.count += book.borrows.length;
    }
  });
  //store in array
  result.push(theAuthor);
});
//sort count high to low, then slice to only shot up to 5 index values
return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
