console.log('welcome to notes app');
shownotes();

//if user add a note,add it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    shownotes();
    
})
//function to show elements of localStorage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
            <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id='${index}' onclick='deletenote(this.id)' class="btn btn-primary">Delete Note</button>
                </div>
            </div> `;


    });
    let noteselm = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteselm.innerHTML = html;
    }
    else{
        noteselm.innerHTML=`Nothing to show! use "add a note" section to add notes.`;
    }
}
//function to delete a note
function deletenote(index){
    console.log(`I am deleting`,index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();


}
let search=document.getElementById("searchTxt");
search.addEventListener("input",function(){
    
    let inputVal=search.value.toLowerCase();
    //console.log(`Input event fired!`,inputVal);
    let noteCards=document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardtxt=element.getElementsByTagName("p")[0].innerText;
        if(cardtxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        //console.log(cardTxt)
    })
})