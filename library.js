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
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        ${book.read ? "<p>Status: Read</p>" : "<p>Status: Not Read</p>"}
        <button class="remove-book" data-index="${index}">Remove Book</button>`;
    bookCard.setAttribute("data-index", index);
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
