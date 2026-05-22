
// DOM ELEMENTS


const notesContainer =
    document.getElementById(
        "notesContainer"
    );

const addNoteBtn =
    document.getElementById(
        "addNoteBtn"
    );


// LOAD NOTES


const savedNotes = getNotes();

savedNotes.forEach((note) => {

    const noteElement =
        createNoteElement(
            note.id,
            note.content
        );

    notesContainer.appendChild(
        noteElement
    );

});


// ADD NOTE EVENT


addNoteBtn.addEventListener(
    "click",
    addNewNote
);


// GET NOTES


function getNotes() {

    return JSON.parse(
        localStorage.getItem(
            "professional-sticky-notes"
        ) || "[]"
    );

}


// SAVE NOTES


function saveNotes(notes) {

    localStorage.setItem(
        "professional-sticky-notes",
        JSON.stringify(notes)
    );

}


// CREATE NOTE


function createNoteElement(
    id,
    content
) {

    const note =
        document.createElement(
            "textarea"
        );

    note.classList.add("note");

    note.placeholder =
        "Write something amazing...";

    note.value = content;

    // Update Note
    note.addEventListener(
        "input",
        () => {

            updateNote(
                id,
                note.value
            );

        }
    );

    // Delete Note
    note.addEventListener(
        "dblclick",
        () => {

            const confirmDelete =
                confirm(
                    "Delete this note?"
                );

            if (confirmDelete) {

                deleteNote(
                    id,
                    note
                );

            }

        }
    );

    return note;

}


// ADD NEW NOTE


function addNewNote() {

    const notes = getNotes();

    const noteObject = {

        id: Date.now(),

        content: ""

    };

    const noteElement =
        createNoteElement(
            noteObject.id,
            noteObject.content
        );

    notesContainer.appendChild(
        noteElement
    );

    notes.push(noteObject);

    saveNotes(notes);

}


// UPDATE NOTE


function updateNote(
    id,
    newContent
) {

    const notes = getNotes();

    const targetNote =
        notes.find((note) => {

            return note.id === id;

        });

    if (targetNote) {

        targetNote.content =
            newContent;

        saveNotes(notes);

    }

}


// DELETE NOTE


function deleteNote(
    id,
    noteElement
) {

    const filteredNotes =
        getNotes().filter((note) => {

            return note.id !== id;

        });

    saveNotes(filteredNotes);

    noteElement.remove();

}