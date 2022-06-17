//Adding notes to the local storage

let addBtn = document.getElementById('addBtn');
let cuurentUser = sessionStorage.getItem('current-user');
console.log("Current user:", cuurentUser);
let notesObj = [];
showNotes();
addBtn.addEventListener('click', function(e){

    let addText = document.getElementById('text');
    let heading = document.getElementById('note-title');
    let notes = localStorage.getItem('notes');
    let imp = document.getElementById('imp');

    if(addText.value != ""){

        if(notes == null){
            notesObj = [];
        }
        else{
            notesObj = JSON.parse(notes);
        }
        let Obj = {
            title: heading.value,
            text: addText.value,
            imp: Number(imp.checked),
            user: cuurentUser
        }
    
        notesObj.push(Obj);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addText.value = "";
        heading.value = "";
        imp.checked = false;
    }
    else{
        let alert = document.getElementById('alert');
        alert.innerHTML = `    <div class="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
          Note cannot be blank
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    }

    showNotes();
    
})



function showNotes(){

    // Check if there is already a note in the localStorage and show them
    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    // pinning the important notes by sorting the NotesObj by imp value
    notesObj.sort((a, b) => b.imp - a.imp);
    //Fetch items for the perticular user
    


    let html = ``;
    notesObj.forEach(function(element, index){

        if(element.user == cuurentUser){
            html+= `<div class="col-sm-6 noteCard mb-5">
            <div class="card ${element.imp?"bg-danger text-light":"bg-light text-dark"}" id=${index}" onload="markImp()">
              <div class="card-body">
                <h5 class="card-title">${element.title == ""?element.text.split(' ').slice(0,2).join(" "): element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button class="btn ${element.imp?"btn-warning text-dark":"btn-success text-light"}" id=${index} onclick = 'deleteNote(this.id)' name="done">❌ Delete Note</button>
              </div>
            </div>
          </div>`
        }

    });

    let notesElem = document.getElementById('note-card');
    if(notesObj.length != 0){
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = `<h2 class="text-center"> Nothing here </h2>`;
    }

}

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}



let searchArea = document.getElementById('search');
searchArea.addEventListener('input', function(e){
    let searchQuery = searchArea.value.toLowerCase();
    console.log(searchQuery);
    // getting all the notes from the dom 
    let noteCard = document.getElementsByClassName('noteCard')
    Array.from(noteCard).forEach(
        function(element){
            let cardText = element.getElementsByTagName('p')[0].innerText;
            let cardHead = element.getElementsByTagName('h5')[0].innerText;
            let combinedText = cardHead+" "+cardText;
            if(combinedText.toLowerCase().includes(searchQuery)){
                element.style.display = 'block';
            }
            else{
                element.style.display = 'none';
            }

        }
    )
})

function logout(){
    sessionStorage.removeItem(cuurentUser);
    location.href = 'index.html'
}
