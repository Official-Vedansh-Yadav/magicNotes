console.log("Welcome to Magic Notes. This is created by Vedansh Yadav");

showNotes();
// If user adds a note, add it to the localStorage

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");

  let addDescription = document.getElementById("addDescription");

  if (addTitle.value == "" || addDescription.value == "") {
    alert("Your Note is Empty Please Type something");
  } else {
    let notes = localStorage.getItem("notes");

    let Note = {
      title: addTitle.value,
      description: addDescription.value
    };

    if (notes == null) {
      notesObj = new Array();
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.push(Note);

    localStorage.setItem("notes", JSON.stringify(notesObj));

    addTitle.value = "";
    addDescription.value = "";
    //   console.log(notesObj);

    showNotes();
  }
});

// Function to show elements from localStorage

function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = new Array();
  } else {
    notesObj = JSON.parse(notes);
  }

let ImportantNotes = localStorage.getItem("ImportantNotes");

  if (ImportantNotes == null) {
    ImportantNotesObj = new Array();
  } else {
    ImportantNotesObj = JSON.parse(ImportantNotes);
  }

  var ImportantMarkingButton = document.getElementById(
    "ImportantMarkingButton"
  );
  let html = "";

  notesObj.forEach(function (element, index) {
	 if (ImportantNotesObj.includes(index)) {
     var style = "background : yellow;";
     ImportantStatus = true;
    }else {
      ImportantStatus = false;
    }
    if (ImportantStatus == true) {
      var buttonTxt = "Delete Important mark";
    } else {
      var buttonTxt = "Mark As Important";
    }

    html += `

            <div class="noteCard my-2 mx-2 card col s4 m4" style="width: 18rem; margin-left: 10px; padding: 20px; ${style}">

                    <div class="card-body">

                        <h5>${element.title}</h5>

						<hr>

                        <p class="card-text"> ${element.description}</p>

						<hr>

<button class="waves-effect waves-light btn modal-trigger" onclick="showModal(${index})">Edit Note</button>
<button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button><button id="ImportantMarkingButton" onclick="markNoteAsImportant(${index})" class="btn btn-primary">${buttonTxt}</button>                 
                    </div>

                </div>`;
  });

  let notesElm = document.getElementById("notes");

  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to Mark or Delete a Note as Important
function markNoteAsImportant(index,calledByAnotherFunction) {
  let ImportantNotes = localStorage.getItem("ImportantNotes");

  if (ImportantNotes == null) {
    ImportantNotesObj = new Array();
  } else {
    ImportantNotesObj = JSON.parse(ImportantNotes);
  }

  if (!(ImportantNotesObj.includes(index)) && calledByAnotherFunction == undefined){
    ImportantNotesObj.push(index);
  } else {
    ImportantNotesObj.splice(ImportantNotesObj.indexOf(index), 1);
  }
  localStorage.setItem("ImportantNotes", JSON.stringify(ImportantNotesObj)); 

  showNotes();
}


// Function to show Modal where you can edit your Note
function showModal(index) {
  document.getElementById("modal1").style.display = "block";
  document.getElementById("index").innerHTML = index;
}

// Function to close Modal
function closeModal() {
  document.getElementById("newTitle").value = "";
  document.getElementById("newDescription").value = "";
  document.getElementById("modal1").style.display = "none";
}

// Function to Edit a note
function editNote() {
  var index = document.getElementById("index").innerHTML;

  let notes = localStorage.getItem("notes");
  let newTitle = document.getElementById("newTitle");
  let newDescription = document.getElementById("newDescription");

  if (newTitle.value === "" && newDescription.value === "") {
    alert("Values are Empty Please Fill them to edit a Note");
  } else {
    if (notes == null) {
      notesObj = new Array();
    } else {
      notesObj = JSON.parse(notes);
    }

	if(newTitle.value === ""){
		notesObj[index].description = newDescription.value;
	}else if(newDescription.value === ""){
		notesObj[index].title = newTitle.value;
	}else{
    notesObj[index].title = newTitle.value;
    notesObj[index].description = newDescription.value;
	}
	
    localStorage.setItem("notes", JSON.stringify(notesObj));

    newTitle.value = "";
    newDescription.value = "";

    showNotes();

    document.getElementById("modal1").style.display = "none";
  }
}

// Function to delete a note

function deleteNote(index) {
  console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = new Array();
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  
  markNoteAsImportant(index,true);
  
  showNotes();
}

let search = document.getElementById("searchTxt");

search.addEventListener("input", function () {
  let inputVal = search.value;

  // console.log('Input event fired!', inputVal);

  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

/*

Further Features:

2. Separate notes by user

3. Sync and host to web server 

*/
