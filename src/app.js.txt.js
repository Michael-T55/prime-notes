const titleInput = document.getElementById("noteTitle"),
  textInput = document.getElementById("noteText"),
  addButton = document.getElementById("addBtn"),
  noteContainer = document.getElementById("notes"),
  changeView = document.getElementById("toggleView");
  


  
  getFromLocalStorage();


//==== input height logic
titleInput.addEventListener("input", () => {
  titleInput.style.height = "auto";
  titleInput.style.height = titleInput.scrollHeight + "px";
});

textInput.addEventListener("input", () => {
  textInput.style.height = "auto";
  textInput.style.height = textInput.scrollHeight + "px";
});
``;
addButton.addEventListener("click", function (e) {
  e.preventDefault();
  textInput.style.height = "auto";
  titleInput.style.height = "auto";
});
//==== input height logic

// toggle view
let setView = true;
changeView.addEventListener("click", function () {
  setView = !setView;
  if (setView) {
    changeView.src = "./src/assets/gridView.svg";
    noteContainer.classList.remove("gtc");
  } else {
    changeView.src = "./src/assets/blockView.svg";
    noteContainer.classList.add("gtc");
  }
});

// toggle view

addButton.addEventListener("click", createNotes);

function createNotes() {
  const title = titleInput.value,
    note = textInput.value,
    date = getDateAndTime("date"),
    time = getDateAndTime();

    

  if (title || note) {
    const noteHTML = `
      <div class="note">
        <div class="dateTime">
          <p>${date}</p>
          <p>${time}</p>
        </div>
        <div class="noteTandP">
          <h3>${title}</h3>
          <p>${note}</p>
        </div>
        <div class="tool">
          <button class="editButton"> 
          <img src="./src/assets/edit.svg" alt="delete"> 
          </button>
          <button class="deleteButton">
            <img src="./src/assets/delete.svg" alt="delete">
          </button>
        </div>
      </div>
    `;

    // Insert the note into the container
    noteContainer.insertAdjacentHTML("afterbegin", noteHTML);
    addToLocalStorage();
    clearTextArea();

    // Event listener for the delete button

    const editBtn = noteContainer.querySelector(".note .tool .editButton");
    editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      editNote(note);
    })

    const delBtn = noteContainer.querySelector(".note .tool button:last-child");
    delBtn.addEventListener("click", (e) => {
      e.preventDefault();
      delBtn.closest(".note").remove();
      removeFromLocalStorage(note);
    });
  }
}

function removeFromLocalStorage(noteContent) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter((note) => note.notes === noteContent);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// dfghjkl;
function editNote(noteD) {
  console.log(noteD);
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  console.log(notes)
  notes = notes.filter((note) => {
    // note.notes !== noteD;
    if (note.notes === noteD) {
      console.log("equal")
      document.createElement("div")
      
    }
  });

   
  // console.log(notes)
}

function addToLocalStorage() {
  const existingNote = localStorage.getItem("notes");
  const noteArray = existingNote ? JSON.parse(existingNote) : [];

  const noteObj = {
    id: crypto.randomUUID(),
    title: titleInput.value,
    notes: textInput.value,
    date: getDateAndTime("date"),
    time: getDateAndTime(),
  };

  noteArray.push(noteObj);
  localStorage.setItem("notes", JSON.stringify(noteArray));
}

function getFromLocalStorage() {
  const storedNotes = localStorage.getItem("notes");
  if (!storedNotes) {
    console.log("No note");
    return;
  }
  const covertedNotes = JSON.parse(storedNotes);

  covertedNotes.map((note) => {
    const { title, notes, date, time } = note;

    const noteEl = `
       <div class="dateTime">
        <p>${date}</p>
        <p>${time}</p>
       </div>

      
        <div class="noteTandP">
          <h3>${title}</h3>
          <p>${notes}</p>
        </div>

        <div class="tool">
        <span class="" > <img src="./src/assets/edit.svg" alt="delete"> </span>
        <button>
            <img src="./src/assets/delete.svg" alt="delete">
          </button>

        </div>
`;
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = noteEl;
    noteContainer.prepend(div);

    const delBtn = noteContainer.querySelector(".note .tool button:last-child");
    delBtn.addEventListener("click", (e) => {
      e.preventDefault();
      delBtn.closest(".note").remove();
      removeFromLocalStorage(notes);
    });
  });
}

function getDateAndTime(type) {
  const date = new Date();

  if (type === "date") {
    const dateS = `${date}`;
    fullDate = dateS.substring(0, 10);
    return fullDate;
  } else {
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return time;
  }
}

function clearTextArea() {
  titleInput.value = "";
  textInput.value = "";
}

// tyuio
