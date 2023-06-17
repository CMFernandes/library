function Book(title,author,pages,read){
    this.oTitle = title;
    this.oAuthor = author;
    this.oPages = pages;
    this.oRead = read;
}

function validateForm(){
    let isValid = true;

    if (title === ""){
        isValid = false;
        title.cl
    } 
    if (author === ""){
        isValid = false; 
    }
    if(pages === ""){
        isValid = false;
    }
    return isValid;
}

let title
let author;
let pages;
let read;

let submitForm = document.getElementById("submitBtn");

submitForm.addEventListener('click', function(event){
    
    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById("pages").value;

    if(!validateForm()){

        return 
    }

    let checkbox = document.getElementById("read");
    if(checkbox.checked) {
        read = true;
    } else {
        read = false;
    }

    addBooktoLibrary();

    displayBooks();

    bookForm.style.display = "none";
    newBookBtn.style.display = "block";

    event.preventDefault();
})

let myLibrary = [];

function addBooktoLibrary(){
    myLibrary.push(new Book(title,author,pages,read));
}