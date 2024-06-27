// Do your work here...
document.addEventListener('DOMContentLoaded', function () {
    renderBooks();
  
    const bookForm = document.getElementById('bookForm');
    bookForm.addEventListener('submit', function (event) {
      event.preventDefault();
      
      const title = document.getElementById('bookFormTitle').value;
      const author = document.getElementById('bookFormAuthor').value;
      const year = document.getElementById('bookFormYear').value;
      const isComplete = document.getElementById('bookFormIsComplete').checked;
  
      addBookAndSaveToLocalStorage(title, author, year, isComplete);
  
      bookForm.reset();
    });

function editBook(bookId) {
    let books = getBooksFromLocalStorage();
    const index = books.findIndex(book => book.id === bookId);
  
    if (index !== -1) {
      const editedTitle = prompt('Masukkan judul buku yang baru:', books[index].title);
      const editedAuthor = prompt('Masukkan penulis buku yang baru:', books[index].author);
      const editedYear = prompt('Masukkan tahun rilis buku yang baru:', books[index].year);
  
      if (editedTitle && editedAuthor && editedYear) {
        books[index].title = editedTitle;
        books[index].author = editedAuthor;
        books[index].year = parseInt(editedYear); 
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
      } else {
        alert('Silakan lengkapi informasi buku yang baru.');
      }
    }
  }
  
    const searchBookForm = document.getElementById('searchBook');
    searchBookForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const searchTitle = document.getElementById('searchBookTitle').value;
  
      searchBookByTitle(searchTitle);
    });
  
    function renderBooks() {
      const books = getBooksFromLocalStorage();
      const incompleteBookList = document.getElementById('incompleteBookList');
      const completeBookList = document.getElementById('completeBookList');
  
      incompleteBookList.innerHTML = '';
      completeBookList.innerHTML = '';
  
      books.forEach(book => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
          completeBookList.appendChild(bookElement);
        } else {
          incompleteBookList.appendChild(bookElement);
        }
      });
    }
  
    function createBookElement(book) {
      const bookElement = document.createElement('div');
      bookElement.setAttribute('data-bookid', book.id);
      bookElement.setAttribute('data-testid', 'bookItem');
  
      const titleElement = document.createElement('h3');
      titleElement.setAttribute('data-testid', 'bookItemTitle');
      titleElement.textContent = book.title;
  
      const authorElement = document.createElement('p');
      authorElement.setAttribute('data-testid', 'bookItemAuthor');
      authorElement.textContent = `Penulis: ${book.author}`;
  
      const yearElement = document.createElement('p');
      yearElement.setAttribute('data-testid', 'bookItemYear');
      yearElement.textContent = `Tahun: ${book.year}`;
  
      const buttonContainer = document.createElement('div');
  
      const completeButton = document.createElement('button');
      completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
      completeButton.textContent = book.isComplete ? 'Belum Selesai' : 'Selesai Dibaca';
      completeButton.addEventListener('click', function () {
        toggleCompleteStatus(book.id);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
      deleteButton.textContent = 'Hapus Buku';
      deleteButton.addEventListener('click', function () {
        deleteBook(book.id);
      });
  
      const editButton = document.createElement('button');
      editButton.setAttribute('data-testid', 'bookItemEditButton');
      editButton.textContent = 'Edit Buku';
      editButton.addEventListener('click', function () {
        editBook(book.id);
      });
  
      buttonContainer.appendChild(completeButton);
      buttonContainer.appendChild(deleteButton);
      buttonContainer.appendChild(editButton);
  
      bookElement.appendChild(titleElement);
      bookElement.appendChild(authorElement);
      bookElement.appendChild(yearElement);
      bookElement.appendChild(buttonContainer);
  
      return bookElement;
    }
  
    function addBookAndSaveToLocalStorage(title, author, year, isComplete) {
      const newBook = {
        id: generateId(),
        title: title,
        author: author,
        year: parseInt(year),
        isComplete: isComplete
      };
  
      let books = getBooksFromLocalStorage();
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books));
  
      renderBooks();
    }
  
    function getBooksFromLocalStorage() {
      const booksString = localStorage.getItem('books');
      let books = [];
  
      if (booksString) {
        try {
          books = JSON.parse(booksString);
        } catch (error) {
          console.error('Error parsing books from localStorage:', error);
        }
      }
  
      return books;
    }
  
    function searchBookByTitle(title) {
      const books = getBooksFromLocalStorage();
      const filteredBooks = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  
      const incompleteBookList = document.getElementById('incompleteBookList');
      const completeBookList = document.getElementById('completeBookList');
  
      incompleteBookList.innerHTML = '';
      completeBookList.innerHTML = '';
  
      filteredBooks.forEach(book => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
          completeBookList.appendChild(bookElement);
        } else {
          incompleteBookList.appendChild(bookElement);
        }
      });
    }
  
    function toggleCompleteStatus(bookId) {
      let books = getBooksFromLocalStorage();
      const index = books.findIndex(book => book.id === bookId);
  
      if (index !== -1) {
        books[index].isComplete = !books[index].isComplete;
        localStorage.setItem('books', JSON.stringify(books));
      }
    }
  
    function deleteBook(bookId) {
      let books = getBooksFromLocalStorage();
      books = books.filter(book => book.id !== bookId);
      localStorage.setItem('books', JSON.stringify(books));
      renderBooks();
    }
  
    function generateId() {
      return new Date().getTime().toString();
    }
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const bookFormIsCompleteCheckbox = document.getElementById('bookFormIsComplete');
    const bookStatusSpan = document.getElementById('bookStatusSpan');
  
    // Tambahkan event listener untuk checkbox
    bookFormIsCompleteCheckbox.addEventListener('change', function () {
      if (this.checked) {
        bookStatusSpan.style.display = 'none';
      } else {
        bookStatusSpan.style.display = 'inline';
      }
    });
  });