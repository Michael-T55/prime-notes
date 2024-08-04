const titleInput = document.getElementById("noteTitle"),
  textInput = document.getElementById("noteText"),
  addButton = document.getElementById("addBtn"),
  noteContainer = document.getElementById("notes"),
  changeView = document.getElementById("toggleView");

document.addEventListener("DOMContentLoaded", displayNote);
addButton.addEventListener("click", saveNote);

function saveNote() {
  const noteTitle = titleInput.value;
  const noteContent = textInput.value;

  if (noteTitle || noteContent) {
    const noteProperties = {
      title: noteTitle,
      content: noteContent,
      id: crypto.randomUUID().substring(0, 8),
      time: getDateAndTime("date"),
      date: getDateAndTime(),
    };

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteProperties);

    localStorage.setItem("notes", JSON.stringify(notes));

    titleInput.value = "";
    textInput.value = "";

    displayNote();
  }
}

function displayNote() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  noteContainer.innerHTML = "";
  console.log(notes);

  notes.map((note, index) => {
    const { title, content, date, time, id } = note;
    const noteHTML = `
      <div class="note">
        <div class="dateTime">
          <p>${date}</p>
          <p>${time}</p>
        </div>
        <div class="noteTandP">
          <h3>${title}</h3>
          <p>${content}</p>
        </div>
        <div class="tool">
          <button class="editButton" onclick="editNote(${index})"> 
           <img src="./src/assets/edit.svg" alt="delete"> 
          </button>
          <button class="deleteButton" onclick="deleteNote(${index})">
            <img src="./src/assets/delete.svg" alt="delete">
          </button>
        </div>
      </div>
    `;
    noteContainer.insertAdjacentHTML("afterbegin", noteHTML);
  });
}

function editNote(id) {
  const notes = JSON.parse(localStorage.getItem("notes"));
  const note = notes[id];

  titleInput.value = note.title;
  textInput.value = note.content;

  deleteNote(id);
}

function deleteNote(id) {
  let notes = JSON.parse(localStorage.getItem("notes"));
  notes.splice(id, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNote()
}

// =================================== //
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