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
    </div>`;
    bookCard.setAttribute("data-index", index);
    bookCard.setAttribute("class", "card-container");
    libraryContainer.appendChild(bookCard);
  });

  document.querySelectorAll(".remove-book").forEach((button) => {
    button.addEventListener("click", function () {
      const bookIndex = this.getAttribute("data-index");
      myLibrary.splice(bookIndex, 1);
      displayBooks();
    });
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
