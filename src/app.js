const titleInput = document.getElementById("noteTitle"),
  textInput = document.getElementById("noteText"),
  addButton = document.getElementById("addBtn"),
  noteContainer = document.getElementById("notes");

  getFromLocalStorage();
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
          <button class="fa-solid fa-pen"></button>
          <button>
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    `;

    // Insert the note into the container
    noteContainer.insertAdjacentHTML("afterbegin", noteHTML);

    // Event listener for the delete button
    const delBtn = noteContainer.querySelector(".note .tool button:last-child");
    delBtn.addEventListener("click", (e) => {
      e.preventDefault();
      delBtn.closest(".note").remove();
      removeNote(note);
    });

    addToLocalStorage();
    clearTextArea();
  }
}


function removeNote(note) {
  const noteRemove = note;
  const existingNote = localStorage.getItem("notes");
  const noteArray = existingNote ? JSON.parse(existingNote) : [];
  const noteMap = noteArray.map((notee) => {
    const { title, notes, date, time } = notee;
    return notes
  })
  console.log(noteMap);
}


function addToLocalStorage() {
  const existingNote = localStorage.getItem("notes");
  const noteArray = existingNote ? JSON.parse(existingNote) : [];

  const noteObj = {
    id: crypto.randomUUID(),
    title : titleInput.value,
    notes : textInput.value,
    date : getDateAndTime("date"),
    time : getDateAndTime(),
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
        <h3 contenteditable="true">${title}</h3>
        <p contenteditable="true">${notes}</p>
        <div>

        <div class="tool">
        <span class="material-symbols-outlined bin" > border_color </span>
        <button>
        <span class="material-symbols-outlined bin" >
          delete
        </span>
        </button>

        </div>
`;
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = noteEl;
    noteContainer.prepend(div);
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

// localStorage.clear()

// tyuio