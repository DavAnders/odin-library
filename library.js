const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  const libraryContainer = document.querySelector(".library");
  libraryContainer.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.innerHTML = `
    <div class="book-info">
        <h2>${book.title}</h2>
    </div>
    <div class="book-info">
        <p><strong>Author:</strong> ${book.author}</p>
    </div>
    <div class="book-info">
        <p><strong>Pages:</strong> ${book.pages}</p>
    </div>
    <div class="book-info">
        ${
          book.read
            ? "<p><strong>Status:</strong> Read</p>"
            : "<p><strong>Status:</strong> Not Read</p>"
        }
    </div>
    <div class="book-actions">
        <button class="remove-book" data-index="${index}">Remove Book</button>
        <button class="toggle-read" data-index="${index}">Toggle Read</button>
    </div>`;
    bookCard.setAttribute("data-index", index);
    bookCard.setAttribute("class", "card-container");
    libraryContainer.appendChild(bookCard);
  });
  attachRemoveBookEventListeners();
  attachToggleReadEventListeners();
}

function attachRemoveBookEventListeners() {
  document.querySelectorAll(".remove-book").forEach((button) => {
    button.removeEventListener("click", removeBook); // Prevent duplicate handlers
    button.addEventListener("click", removeBook);
  });
}
function attachToggleReadEventListeners() {
  document.querySelectorAll(".toggle-read").forEach((button) => {
    button.removeEventListener("click", toggleReadStatus); // Prevent duplicate handlers
    button.addEventListener("click", toggleReadStatus);
  });
}

document
  .querySelector("#new-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = this.querySelector('[name="title"]').value;
    const author = this.querySelector('[name="author"]').value;
    const pages = this.querySelector('[name="pages"]').value;
    const read = this.querySelector('[name="read"]').checked;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayBooks();
  });

document.querySelector(".new-book").addEventListener("click", () => {
  const form = document.getElementById("new-book-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

document.querySelectorAll(".toggle-read").forEach((button) => {
  button.addEventListener("click", function () {
    const bookIndex = this.getAttribute("data-index");
    myLibrary[bookIndex].toggleRead();
    displayBooks();
  });
});

function removeBook() {
  const bookIndex = parseInt(this.getAttribute("data-index"), 10);
  myLibrary.splice(bookIndex, 1);
  displayBooks();
}

function toggleReadStatus() {
  const bookIndex = parseInt(this.getAttribute("data-index"), 10);
  myLibrary[bookIndex].toggleRead();
  displayBooks();
}

// adding class practice

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  toggleReadStatus(index) {
    this.books[index].toggleRead();
  }
}

const library = new Library();

function addBookToLibrary(book) {
  library.addBook(book);
}

function removeBook() {
  const bookIndex = parseInt(this.getAttribute("data-index"), 10);
  library.removeBook(bookIndex);
  displayBooks();
}

function toggleReadStatus() {
  const bookIndex = parseInt(this.getAttribute("data-index"), 10);
  library.toggleReadStatus(bookIndex);
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.querySelector(".library");
  libraryContainer.innerHTML = "";

  library.books.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.innerHTML = `
    <div class="book-info">
        <h2>${book.title}</h2>
    </div>
    <div class="book-info">
        <p><strong>Author:</strong> ${book.author}</p>
    </div>
    <div class="book-info">
        <p><strong>Pages:</strong> ${book.pages}</p>
    </div>
    <div class="book-info">
        ${
          book.read
            ? "<p><strong>Status:</strong> Read</p>"
            : "<p><strong>Status:</strong> Not Read</p>"
        }
    </div>
    <div class="book-actions">
        <button class="remove-book" data-index="${index}">Remove Book</button>
        <button class="toggle-read" data-index="${index}">Toggle Read</button>
    </div>`;
    bookCard.setAttribute("data-index", index);
    bookCard.setAttribute("class", "card-container");
    libraryContainer.appendChild(bookCard);
  });

  attachRemoveBookEventListeners();
  attachToggleReadEventListeners();
}

document
  .querySelector("#new-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = this.querySelector('[name="title"]').value;
    const author = this.querySelector('[name="author"]').value;
    const pages = this.querySelector('[name="pages"]').value;
    const read = this.querySelector('[name="read"]').checked;
    const newBook = new Book(title, author, pages, read);
    library.addBook(newBook);
    displayBooks();
  });
