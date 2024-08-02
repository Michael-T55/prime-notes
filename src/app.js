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
          <span class="material-symbols-outlined bin" > <img src="./src/assets/edit.svg" alt="delete"> </span>
          <button>
            <img src="./src/assets/delete.svg" alt="delete">
          </button>
        </div>
      </div>
    `;

    // <span class="material-symbols-outlined">delete</span>;

    // Insert the note into the container
    noteContainer.insertAdjacentHTML("afterbegin", noteHTML);
    addToLocalStorage();

    // Event listener for the delete button
    const delBtn = noteContainer.querySelector(".note .tool button:last-child");
    delBtn.addEventListener("click", (e) => {
      e.preventDefault();
      delBtn.closest(".note").remove();
      // removeNote(note);
      removeFromLocalStorage(note);
    });

    clearTextArea();
  }
}



function removeFromLocalStorage(noteContent) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter((note) => note.notes !== noteContent);
  localStorage.setItem("notes", JSON.stringify(notes));
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
        <h3 contenteditable="true">${title}</h3>
        <p contenteditable="true">${notes}</p>
        <div>

        <div class="tool">
        <span class="material-symbols-outlined bin" > <img src="./src/assets/edit.svg" alt="delete"> </span>
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
// const num = [1,2,3,4,5]


