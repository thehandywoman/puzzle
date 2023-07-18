var rows = 4;
var columns = 2;

var currTile;
var otherTile;
var turns = 0;
var rotation = 0;


window.onload = function() {
    //initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "./images/blank.png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop
            tile.addEventListener("click", rotateImage);
            document.getElementById("board").append(tile);

        }
    }

    //pieces
    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".png";

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop
        tile.addEventListener("click", rotateImage);

        document.getElementById("pieces").append(tile);
    }
}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("img")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    currTile.classList.add("small");
    setTimeout(function() {
        currTile.classList.remove("small");
    }, 500);

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

function rotateImage(ev) {
   ev.preventDefault();
    var target = ev.target;
    if    (target.style.transform == 'rotate(90deg)'){
    (target.style.transform = 'rotate(180deg)');
    }
    else if (target.style.transform == 'rotate(180deg)'){
    (target.style.transform = 'rotate(270deg)');
    }
    else if (target.style.transform == 'rotate(270deg)'){
    (target.style.transform = 'rotate(0deg)');
    }
    else {
    (target.style.transform = 'rotate(90deg)');
    }
}

const navLinks = document.querySelectorAll("nav a");

for (let i = 0; i < navLinks.length; i++) {
  if (navLinks[i].pathname === window.location.pathname) {
    navLinks[i].classList.add("active");
  } else {
    navLinks[i].classList.remove("active");
  }
}