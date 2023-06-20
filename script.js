function Book(title,author,pages,read,bookIndex){
    this.oTitle = title;
    this.oAuthor = author;
    this.oPages = pages;
    this.oRead = read;
    this.bookIndex = bookIndex;
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
let bookIndex = 0;
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

    bookIndex++;
    event.preventDefault();
})

let myLibrary = [];

function addBooktoLibrary(){
    myLibrary.push(new Book(title,author,pages,read,bookIndex));
}

let card;
let deleteBookBtn;
let cardContainer = document.querySelector(".cardContainer");
let lastIndex;
let index;
let readStatus


function displayBooks() {
    lastIndex = myLibrary.length-1;

    createCard()
}

function createCard(){
    card = document.createElement("div");
    card.setAttribute("data-id", bookIndex);
    card.classList.add("card");

    let paraTitle;
    let paraAuthor;
    let paraPages;
    let paraRead;

    paraTitle = document.createElement("p");
    paraTitle.textContent = myLibrary[lastIndex].oTitle;

    paraAuthor = document.createElement("p");
    paraAuthor.textContent = "By: " + myLibrary[lastIndex].oAuthor;

    paraPages = document.createElement("p");
    paraPages.textContent = myLibrary[lastIndex].oPages + " pages" ;

    paraRead = document.createElement("p");
    paraRead.textContent = myLibrary[lastIndex].oRead ? "Already Read" : "Not read yet";
    

    changeBorder(myLibrary[lastIndex].oRead, card);
    
    readStatus = document.createElement("button");
    customizeReadBtn();
    readStatus.addEventListener('click', function(e){
        changeReadStatus(e.target.parentNode.dataset.id, paraRead);
    })

    deleteBookBtn = document.createElement("button");
    customizeDelBtn();
    deleteBookBtn.addEventListener('click', function(e){
        deleteBook(e.target.parentNode.dataset.id);
    })
    
    appendCard(paraTitle,paraAuthor,paraPages,paraRead,readStatus,deleteBookBtn);
}

function appendCard(paraTitle,paraAuthor,paraPages,paraRead,readStatus,deleteBookBtn){
    card.appendChild(paraTitle);
    card.appendChild(paraAuthor);
    card.appendChild(paraPages);
    card.appendChild(paraRead);
    card.appendChild(readStatus);
    card.appendChild(deleteBookBtn);
    cardContainer.appendChild(card);
}

function changeBorder(oRead,card){
    if(oRead === true){
        card.style.border = "green solid 1px"
        card.style.boxShadow = "0px 2px 13px 3px rgba(140, 168, 136, 0.27)"
    } else {
        card.style.border = "red solid 1px"
        card.style.boxShadow = "0px 2px 13px 3px rgba(172, 119, 119, 0.27)"
    }
}
function customizeDelBtn(){
    let tmpValue = "delButton" + lastIndex;
    deleteBookBtn.setAttribute("id", tmpValue);
    deleteBookBtn.innerText = "Delete";
}

function customizeReadBtn(){
    readStatus.innerText = "Change read status";
}

function changeReadStatus(id, paraRead){
    myLibrary[id].oRead = !myLibrary[id].oRead;

    let read = myLibrary[id].oRead
    paraRead.textContent = read ? "Already Read" : "Not read yet";
    
    let card = document.querySelector(`[data-id="${id}"]`);

    changeBorder(read,card);
}

function deleteBook(id){
    for(let i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].bookIndex == id){
            myLibrary.splice(i,1);
            let cardToDel = document.querySelector(`[data-id="${id}"]`);
            cardToDel.remove();
        }
    }
}    

let newBookBtn = document.querySelector(".newBookBtn");
let bookForm = document.querySelector("#bookForm");

newBookBtn.addEventListener('click', function(){
    bookForm.style.display = "block";
    newBookBtn.style.display = "none";
    clearInputs();
});

function clearInputs(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
}
